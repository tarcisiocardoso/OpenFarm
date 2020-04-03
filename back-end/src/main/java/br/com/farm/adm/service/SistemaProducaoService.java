package br.com.farm.adm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.farm.adm.model.SistemaProducao;
import br.com.farm.adm.repository.SistemaProducaoRepository;

@Service
public class SistemaProducaoService {
    @Autowired
    SistemaProducaoRepository repository;

    public SistemaProducao create(SistemaProducao o) {
        return repository.save(o);
    }

    public SistemaProducao findById(String id) {
        return repository.findById(id).get();
    }

    public SistemaProducao findByNome(String nome) {
        return repository.findByNome(nome);
    }

    public List<SistemaProducao> findAll() {
        return repository.findAll();
    }

    public SistemaProducao update(SistemaProducao o) {
        return repository.save(o);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}