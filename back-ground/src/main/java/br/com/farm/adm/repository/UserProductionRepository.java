package br.com.farm.adm.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.farm.adm.model.UserProduction;

public interface UserProductionRepository extends MongoRepository<UserProduction, String> {

}