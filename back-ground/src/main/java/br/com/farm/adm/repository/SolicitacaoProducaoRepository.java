package br.com.farm.adm.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import br.com.farm.adm.model.SolicitacaoProducao;

public interface SolicitacaoProducaoRepository extends MongoRepository<SolicitacaoProducao, String> {
    
    @Query("{ 'status' : 0 }")
    public List<SolicitacaoProducao> findSolicitacaoProducaoAberta();
}