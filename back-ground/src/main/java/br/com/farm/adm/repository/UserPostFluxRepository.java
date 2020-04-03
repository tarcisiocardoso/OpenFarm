package br.com.farm.adm.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import br.com.farm.adm.model.UserPost;
import reactor.core.publisher.Flux;

public interface UserPostFluxRepository extends ReactiveCrudRepository<UserPost, String> {

	Flux<UserPost> findAllByIdUser(String idUser);

}
