package br.com.farm.adm;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import br.com.farm.adm.model.Fazenda;
import br.com.farm.adm.model.SistemaProducao;
import br.com.farm.adm.model.User;
import br.com.farm.adm.service.FazendaService;
import br.com.farm.adm.service.SistemaProducaoService;
import br.com.farm.adm.service.UserService;

@Component
public class RunInitCommand implements CommandLineRunner {

    @Autowired
    FazendaService fazendaService;
    @Autowired
    UserService userService;

    @Autowired
    SistemaProducaoService sistemaProducaoService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    ResourceLoader resourceLoader;
    Gson g = new Gson();

    @Override
    public void run(String... args) throws Exception {
        System.out.println( ">>>>RunInitCommand<<<<" );
        
        populaUserAdmSeNaoExiste();
        List<Fazenda> lst = fazendaService.findAll();
        System.out.println( lst.size() );
        if( lst.size() == 0 ) populaFarm();

        List<SistemaProducao>lstSistemaProducao = sistemaProducaoService.findAll();
        System.out.println("-->lstSistemaProducao: " +lstSistemaProducao.size() );
        if( lstSistemaProducao.size() == 0 ) populaSistemaProducao();

        System.out.println( ">>>>FIM<<<<" );
    }

    private void populaUserAdmSeNaoExiste() {
        User user = userService.findByLogin("adm");
        if( user == null ){
            String json = loadRecurso("userAdm.json");
            user = g.fromJson(json, User.class);
            user.setId(null);    
            System.out.println(">>>>>>>>>>>>>>>>"+ user.getPassword() );
            // System.out.println(passwordEncoder.encode(user.getPassword()));

            user.setPassword( passwordEncoder.encode(user.getPassword()));
            user = userService.create(user);
        }
    }
    private void populaSistemaProducao(){
        String json = loadRecurso("regraOvino.json");
        SistemaProducao prod  = g.fromJson(json, SistemaProducao.class);
        this.sistemaProducaoService.create(prod);
    }


    private void populaFarm() {
        
        User fazendeiro = getFazendeiro();
        
        String json = loadRecurso("fazenda.json");
        Fazenda farm = g.fromJson(json, Fazenda.class);
        

        farm.id = null;
        farm.proprietarios = new ArrayList<String>(){{
            add(fazendeiro.getId());
        }};

        System.out.println( farm.identificacao.nome );
        fazendaService.create( farm );
    }
    

    private User getFazendeiro() {
        User user = userService.findByLogin("fazendeiro");
        if( user == null ){
            String json = loadRecurso("userFarm.json");
            user = g.fromJson(json, User.class);
            user.setId(null);    
            System.out.println(">>>>>>>>>>>>>>>>"+ user.getPassword() );
            // System.out.println(passwordEncoder.encode(user.getPassword()));

            user.setPassword( passwordEncoder.encode(user.getPassword()));
            user = userService.create(user);
        }
        return user;
    }

    private String loadRecurso(String recurso) {
        Resource rs = resourceLoader.getResource("classpath:data/"+recurso);
        String ret = "";
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(rs.getInputStream()));
            while (reader.ready()) {
                ret += "\n"+ reader.readLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ret;
    }

}