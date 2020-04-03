package br.com.farm.adm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.farm.adm.repository.PostRepository;
import br.com.farm.adm.model.Post;

@Service
public class PostService implements IPostService{

    @Autowired
    PostRepository repository;
    
    @Override
    public void create(Post o) {
        repository.save(o);
    }

    @Override
    public Post findById(String id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Post> findByTitulo(String titulo) {
        return repository.findByTitulo(titulo);
    }

    @Override
    public List<Post> findAll() {
        return repository.findAll();
    }

    @Override
    public Post update(Post o) {
        return repository.save(o);
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }


}