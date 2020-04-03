package br.com.farm.adm.repository;

import br.com.farm.adm.model.Post;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PostNormalRepository extends MongoRepository<Post, Long> {


    @Query("{ 'isLido' : false }")
    public List<Post> findNovosPost();
}
