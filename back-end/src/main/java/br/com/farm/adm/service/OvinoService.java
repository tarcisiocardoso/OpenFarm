package br.com.farm.adm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.farm.adm.repository.OvinoRepository;
import br.com.farm.adm.model.Ovino;

@Service
public class OvinoService implements IOvinoService{

    @Autowired
    OvinoRepository repository;
    
    @Override
    public void create(Ovino o) {
        repository.save(o);
    }

    @Override
    public Ovino findById(String id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Ovino> findByRaca(String raca) {
        return repository.findByRaca(raca);
    }

    @Override
    public List<Ovino> findAll() {
        return repository.findAll();
    }

    @Override
    public Ovino update(Ovino o) {
        return repository.save(o);
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }


}