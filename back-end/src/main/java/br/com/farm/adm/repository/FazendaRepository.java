package br.com.farm.adm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import br.com.farm.adm.model.Fazenda;

public interface FazendaRepository extends MongoRepository<Fazenda, String> {

    public Optional<Fazenda> findById(String id);

    @Query(value="{ 'proprietarios' : ?0 }", fields="{ 'identificacao.nome': 1, _id: 1 }")
	List<Object> findByUserId(String id);
    
}