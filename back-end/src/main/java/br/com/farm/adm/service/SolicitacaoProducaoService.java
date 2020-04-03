package br.com.farm.adm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.farm.adm.model.SolicitacaoProducao;
import br.com.farm.adm.repository.SolicitacaoProducaoRepository;

@Service
public class SolicitacaoProducaoService{
    @Autowired
    SolicitacaoProducaoRepository repository;

    public SolicitacaoProducao create(SolicitacaoProducao o) {
        
        return repository.save(o);
    }
}