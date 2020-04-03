package br.com.farm.adm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.farm.adm.repository.UserRepository;
import br.com.farm.adm.model.User;

@Service
public class UserService implements IUserService{

    @Autowired
    UserRepository repository;
    
    @Override
    public void create(User o) {
        repository.save(o);
    }

    @Override
    public Optional<User> findById(String id) {
        return repository.findById(id);
    }

    @Override
    public User findByLogin(String login) {
        return repository.findByLogin(login);
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public User update(User o) {
        return repository.save(o);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }


}