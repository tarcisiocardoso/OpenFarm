package br.com.farm.adm.repository;


import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import br.com.farm.adm.model.Post;

public interface PostRepository extends ReactiveCrudRepository<Post, String> {

}
