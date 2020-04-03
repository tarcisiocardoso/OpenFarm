package br.com.farm.adm.service;

import java.util.List;
import java.util.Optional;

import br.com.farm.adm.model.User;

public interface IUserService {
    void create(User o);
    Optional<User> findById(String id);
    User findByLogin(String login);
    List<User> findAll();
    User update(User o);
    void delete(Long id);
}