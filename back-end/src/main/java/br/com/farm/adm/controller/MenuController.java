package br.com.farm.adm.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.farm.adm.exception.ResourceNotFoundException;
import br.com.farm.adm.model.User;
import br.com.farm.adm.repository.UserRepository;

@RestController
@RequestMapping("/api/menu")
public class MenuController{

    @Autowired
    private UserRepository userRepository;

    
    @RequestMapping(method = RequestMethod.GET, value="/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public List<Menu> montaMenu( @PathVariable("id") String id ) {

        User user = userRepository.findById(id).
            orElseThrow(() -> new ResourceNotFoundException("User", "id", id ));

        
        List<Menu> lst = new ArrayList<Menu>();
        
        // user.perfis.stream().filter(perfil -> "fazenda".equals(perfil));

        // lst.add(new Menu("Inicio", "home", "home" ));
        // lst.add(new Menu("Linha do tempo", "timeline", "about" ));
        // lst.add(new Menu("Menu tres", "trending_up", "topics" ));

        user.perfis.forEach((perfil)->{
          if( perfil.equals("fazenda")){
            // lst.add(new Menu("Criar Nova produção", "build", "newProduction" ));
            lst.add(new Menu("Painel de controle", "dashboard", "dashboard" ));
            // lst.add(new Menu("Grafico de produtividade", "show_chart", "chart" ));
            lst.add(new Menu("Fazenda", "home_work", "fazenda"));
            lst.add(new Menu("Nova Produção", "launch_icon", "wizardProducao"));

            lst.add(new Menu("Formulação Ração", "home_work", "racao"));
          }
          if( perfil.equals("adm")){
            lst.add(new Menu("Produção", "build", "manutProducao" ));
          }  

        });

        lst.add(new Menu("Adicionar uma nota", "note_add", "blog" ));
        
        

        return lst;
    }

    private class Menu{
        public String nome;
        public String icon;
        public String acao;

        public Menu(String n, String i, String a){
            nome = n; icon =i; acao = a;
        }

        public String toString(){
            return "{nome: "+nome+", icon: "+icon+", acao: "+acao+"}";
        }
    }
}