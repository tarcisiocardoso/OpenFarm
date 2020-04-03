package br.com.farm.adm.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.farm.adm.model.Ovino;

public interface OvinoRepository extends MongoRepository<Ovino, String> {
    
    public List<Ovino> findByRaca(String raca);
}