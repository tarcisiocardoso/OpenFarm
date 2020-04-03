package br.com.farm.adm.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.farm.adm.model.Post;

public interface PostRepository extends MongoRepository<Post, String> {
    
    public List<Post> findByTitulo(String titulo);
}