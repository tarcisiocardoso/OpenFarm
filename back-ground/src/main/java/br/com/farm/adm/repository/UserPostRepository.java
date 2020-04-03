package br.com.farm.adm.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import br.com.farm.adm.model.UserPost;

public interface UserPostRepository extends MongoRepository<UserPost, String> {

    List<UserPost> findByIdUser(String idUser);
}
