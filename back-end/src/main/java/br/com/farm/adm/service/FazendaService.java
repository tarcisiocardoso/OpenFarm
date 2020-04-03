package br.com.farm.adm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.farm.adm.model.Fazenda;
import br.com.farm.adm.repository.FazendaRepository;

@Service
public class FazendaService {
    @Autowired
    FazendaRepository repository;

    public Fazenda create(Fazenda o) {
        return repository.save(o);
    }

    public Fazenda findById(String id) {
        return repository.findById(id).get();
    }

    public List<Fazenda> findAll() {
        return repository.findAll();
    }

    public Fazenda update(Fazenda o) {
        return repository.save(o);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

	public List<Object> findByUserId(String id) {
		return repository.findByUserId(id);
	}
}