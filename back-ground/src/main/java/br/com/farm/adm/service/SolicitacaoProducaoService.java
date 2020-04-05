package br.com.farm.adm.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mongodb.util.JSON;

import br.com.farm.adm.model.Post;
import br.com.farm.adm.model.SolicitacaoProducao;
import br.com.farm.adm.model.UserPost;
import br.com.farm.adm.model.UserProduction;
import br.com.farm.adm.repository.PostNormalRepository;
import br.com.farm.adm.repository.SolicitacaoProducaoRepository;
import br.com.farm.adm.repository.UserPostRepository;
import br.com.farm.adm.repository.UserProductionRepository;

@Service
public class SolicitacaoProducaoService {

    @Autowired
    SolicitacaoProducaoRepository repository;
    @Autowired
    PostNormalRepository postRepository;
    @Autowired
    UserPostRepository userPostRepository;
    @Autowired
    UserProductionRepository userProductionRepository;

//    @Async
    public CompletableFuture<Post> execSolicitacaoProducao() throws InterruptedException {
        Post results =new Post();

        System.out.println(">>>SolicitacaoProducaoService<<<");

        List<SolicitacaoProducao> lst = repository.findSolicitacaoProducaoAberta();

        for(SolicitacaoProducao sp: lst ){
            System.out.println("====>"+ sp.data );
//            statusEmExecucao(sp).ifPresent((e) ->{
//                montaProducao(sp);
//            });
            
//            statusEmExecucao(sp)
//            	.map( this::montaProducao )
//            	.orElse(postUserProblema());
            statusEmExecucao(sp)
            	.map( this::montaProducao )
            	.orElseThrow( IllegalArgumentException::new)
            	.map(this::newPost)
            	.orElseThrow( IllegalArgumentException::new)
            	.map(this::postUserInstrucoes)
            	.orElseThrow( IllegalArgumentException::new);
            
            System.out.println("====>CONCLUIDOO<=====" );
        }
        return CompletableFuture.completedFuture(results);
    }
    
    private Optional<UserProduction> postUserProblema(Optional<Object[]> objs){
    	
    	return null;
    }
    private Optional<Object[]> newPost(UserProduction prod){
    	System.out.println(">>>>newPost<<<<");
    	Post p = new Post();
    	p.assunto = "Criação produção "+prod.nomeProducao;
    	p.categoria = "newProducao";
    	p.criador = "system";
    	p.dtCriacao = new Date();
    	p.isLido = true; // não é necessario executar em outro processo
    	p.titulo = "Produção "+prod.nomeProducao+" disponivel";
    	p.conteudo = montaConteudoNovaProducao(prod);
    	
    	this.postRepository.save(p);
    	Object[] retorno= {
    			prod, p
    	};
    	return Optional.of(retorno);
    }
    
    private String montaConteudoNovaProducao(UserProduction prod) {
    	StringBuilder sb = new StringBuilder();
    	sb.append("<h3>Acompanhe sua producão</h3>")
    	.append("<p>Todas as produções podem ser acompanhada no <a href='/dashboard'>Painel de controle do usuario</a> ou diretamente ")
    	.append("<a href='/dashboard/").append(prod.id).append("'>na produção criada (").append(prod.nomeProducao).append(")</a></p>");
    	
    	//TODO definir regra das informações complementares
    	if( true == true) {
    		sb.append("<h4>Informações complementares</h4>")
    		.append("<p>O sistema inferiou algumas informações que pode não esta de acordo com sua produção, seria intressante entrar <a href='/prod/"+prod.nomeProducao+"/piquete?id="+prod.id+"'>na definição dos piquetes</a>")
    		.append(" para uma melhor adequação a realidade e informar como esta o <a href='/prod/"+prod.nomeProducao+"/volumoso?id="+prod.id+"'>complemento com volumoso</a> fornecido aos aniamis.</p>");
		}
		sb.append("<p>Para ter uma informação mais precisa informe o <a href='/prod/"+prod.nomeProducao+"/producao?id="+prod.id+"'>valor médio da comercialização na sua região</a></p>.");
    	sb.append("<br/><br/><br/><p>Assim que possivel siga as orientações sugeridas e acompanhe a produção ao logo dos dias para receber informações importate.</p>");
    	
		return sb.toString();
	}

	private Optional<String> postUserInstrucoes(Object[] objs){
		System.out.println(">>>>postUserInstrucoes<<<<");
    	UserProduction production = (UserProduction)objs[0];
    	Post post = (Post)objs[1];
    	String ret="sucesso!";
    	production.proprietarios.forEach(proprietario ->{
    		UserPost up = new UserPost();
            up.idPost = post.id;
            up.idUser = proprietario;
        
            up.isLido = false;
            up.info = "Solicitação de produção atendida";
        
            userPostRepository.insert( up );
    	});
        
    	return Optional.of(ret);
    }

    private Optional<SolicitacaoProducao> statusEmExecucao(SolicitacaoProducao sp) {
        System.out.println(">>>statusEmExecucao<<<");
        sp.status=1;//em execução
        Optional<SolicitacaoProducao> op = Optional.of(repository.save(sp ));
        return op;
    }

    @SuppressWarnings({ "rawtypes", "serial", "deprecation"})
    private Optional<UserProduction> montaProducao(SolicitacaoProducao sp) {
        System.out.println(">>>montaProducao<<<");
    	Gson g = new Gson();

        final UserProduction prod = new UserProduction();
        prod.dtCriacao = new Date();
        prod.proprietarios = new ArrayList<String>(){{
            add(sp.idUser);
        }};
        prod.status=0;
        prod.idProducao = sp.entrada.producao.id;
        prod.nomeProducao = sp.entrada.producao.nome;
        
        JsonObject dados = new JsonObject();
        sp.entrada.producao.regras.forEach(p ->{
        	System.out.println(p+" =>"+p.getClass() );
        	
        	LinkedHashMap map = (LinkedHashMap)p;
            try {
            	JsonElement el = g.fromJson(map.get("regra").toString(), JsonElement.class);
				dados.add(map.get("nome").toString(), el );
			} catch (Exception e) {
				e.printStackTrace();
			}
        });
        
        if( sp.entrada.user != null ) {
        	
            JsonObject entradaUser = g.toJsonTree(sp.entrada.user).getAsJsonObject();
            int area = entradaUser.get("area").getAsInt();
					
			if( dados.has("producao")){
				JsonObject producao =  dados.get("producao").getAsJsonObject();//g.toJsonTree( dado).getAsJsonObject();
				System.out.println(producao);
				
				producao.addProperty("qtdAdulto", entradaUser.get("qtd").getAsNumber() );
				producao.addProperty("areaProducaoEmHE", area );
			}
        	if( entradaUser.has("suplemento")) {
        		JsonObject volumoso = new JsonObject();
        		if( entradaUser.get("suplemento").getAsJsonObject().get("silo").getAsBoolean() ) {
        			volumoso.addProperty("silo", 0);
        		}
        		if( entradaUser.get("suplemento").getAsJsonObject().get("feno").getAsBoolean() ) {
        			volumoso.addProperty("feno", 0);
        		}
        		if( entradaUser.get("suplemento").getAsJsonObject().get("capineira").getAsBoolean() ) {
        			volumoso.addProperty("capineira", 0);
        		}
        		dados.add("complemento", volumoso);
        	}
        	if( entradaUser.has("piquete") && dados.has("pasto")) {
        		int qtdPiquete = entradaUser.get("piquete").getAsInt();
        		
        		JsonObject pasto = dados.get("pasto").getAsJsonObject();
        		pasto.addProperty("piquetes", qtdPiquete );
        		pasto.addProperty("tamanhoPiquete", area/qtdPiquete );
        	}
        }
        System.out.println( dados.toString() );
        prod.dados = JSON.parse(dados.toString());
        
        UserProduction p = this.userProductionRepository.save(prod);
        return Optional.of( p );
    }
	// private JsonObject find(JsonArray arr, String nome) {
	// 	for(int i=0; i< arr.size(); i++){
	// 		JsonElement item = arr.get(i);
	// 		if( item.getAsJsonObject().has(nome)) {
	// 			return item.getAsJsonObject();
	// 		}
	// 	}
	// 	return new JsonObject();
	// }

}