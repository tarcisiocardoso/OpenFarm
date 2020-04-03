package br.com.farm.adm.service;

import java.util.List;

import br.com.farm.adm.model.Ovino;

public interface IOvinoService {
    void create(Ovino o);
    Ovino findById(String id);
    List<Ovino> findByRaca(String raca);
    List<Ovino> findAll();
    Ovino update(Ovino o);
    void delete(String id);
}