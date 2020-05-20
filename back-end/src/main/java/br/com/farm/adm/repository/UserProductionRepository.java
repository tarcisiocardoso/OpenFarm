package br.com.farm.adm.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import br.com.farm.adm.model.UserProduction;

public interface UserProductionRepository extends MongoRepository<UserProduction, String> {

    @Query(value="{ 'proprietarios' : ?0 }", fields="{}")
	List<UserProduction> findByUserId(String id);

    @Query(value="{ 'idFazenda' : ?0 }", fields="{}")
	List<UserProduction> findByFarmId(String id);


    
}