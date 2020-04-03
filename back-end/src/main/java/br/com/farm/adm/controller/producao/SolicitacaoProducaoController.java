package br.com.farm.adm.controller.producao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import br.com.farm.adm.model.SolicitacaoProducao;
import br.com.farm.adm.service.SolicitacaoProducaoService;

@RestController
@RequestMapping("/api/solicitacaoProducao")
public class SolicitacaoProducaoController {

    @Autowired
    SolicitacaoProducaoService service;

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public SolicitacaoProducao create(@RequestBody SolicitacaoProducao e) {
        return service.create(e);
    }
}