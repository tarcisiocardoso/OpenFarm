package br.com.farm.adm.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.farm.adm.model.SolicitacaoProducao;

public interface SolicitacaoProducaoRepository extends MongoRepository<SolicitacaoProducao, String> {
    
}