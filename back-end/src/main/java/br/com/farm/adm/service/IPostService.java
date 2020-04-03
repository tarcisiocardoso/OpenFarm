package br.com.farm.adm.service;

import java.util.List;

import br.com.farm.adm.model.Post;

public interface IPostService {
    void create(Post o);
    Post findById(String id);
    List<Post> findByTitulo(String titulo);
    List<Post> findAll();
    Post update(Post o);
    void delete(String id);
}