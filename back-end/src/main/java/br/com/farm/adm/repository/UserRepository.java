package br.com.farm.adm.repository;

import br.com.farm.adm.model.User;
// import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.stereotype.Repository;

import java.util.Optional;

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {
public interface UserRepository extends MongoRepository<User, Long> {
    public Optional<User> findByEmail(String email);

    public Boolean existsByEmail(String email);

    public User findByLogin(String login);

    public Optional<User> findById(String id);

}
