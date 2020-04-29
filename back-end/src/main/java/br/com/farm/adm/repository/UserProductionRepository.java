package br.com.farm.adm.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import br.com.farm.adm.model.UserProduction;

public interface UserProductionRepository extends MongoRepository<UserProduction, String> {

    @Query(value="{ 'proprietarios' : ?0 }", fields="{ 'identificacao.nome': 1, _id: 1 }")
	Optional<UserProduction> findByUserId(String userId);




    
}