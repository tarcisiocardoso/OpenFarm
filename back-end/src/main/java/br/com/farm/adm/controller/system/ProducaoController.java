package br.com.farm.adm.controller.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.com.farm.adm.model.SistemaProducao;
import br.com.farm.adm.service.SistemaProducaoService;

@RestController
@RequestMapping("/api/producao")
public class ProducaoController{

    @Autowired
    SistemaProducaoService service;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public SistemaProducao create(@RequestBody SistemaProducao sistemaProducao) {
       return service.create(sistemaProducao);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public SistemaProducao update(@RequestBody SistemaProducao sistemaProducao) {
       return service.create(sistemaProducao);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<SistemaProducao> findById(@PathVariable("id") String id) {
        SistemaProducao e = service.findById(id);
        HttpStatus status = e != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        
        return new ResponseEntity<SistemaProducao>(e, status);
    }
 
    @RequestMapping(value = "/nome/{nome}", method = RequestMethod.GET)
    @ResponseBody
    public SistemaProducao findByRaca(@PathVariable("nome") String nome) {
        return service.findByNome(nome);
    }

    @RequestMapping(method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public List<SistemaProducao> findAll() {
        System.out.println(">>>>>> BUSCANDO OVINOS <<<<<");
        List<SistemaProducao> emps = service.findAll();

        // try{
        //     Thread.sleep(2000);
        //     }catch(Exception ex){}

            
        return emps;
    }
}