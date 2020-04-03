package br.com.farm.adm.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.farm.adm.model.SistemaProducao;

public interface SistemaProducaoRepository extends MongoRepository<SistemaProducao, String> {
    
    public SistemaProducao findByNome(String nome);
}