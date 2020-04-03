package br.com.farm.adm.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.farm.adm.model.Farm;

@RepositoryRestResource(collectionResourceRel = "farm", path = "farm")
public interface FarmRepository extends MongoRepository<Farm, String> {

  List<Farm> findByNome(@Param("Nome") String nome);

}