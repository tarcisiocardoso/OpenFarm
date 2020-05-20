package br.com.farm.adm.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.farm.adm.model.UserProduction;
import br.com.farm.adm.repository.UserProductionRepository;

@Service
public class UserProductionService {

    @Autowired
    UserProductionRepository repository;

    public UserProduction create(UserProduction o) {
        return repository.save(o);
    }

    public UserProduction findById(String id) {
        return repository.findById(id).get();
    }
    
    public List<UserProduction> findByUserId(String userId){
        return repository.findByUserId(userId);
    }

    public List<UserProduction> findAll() {
        return repository.findAll();
    }
    public UserProduction update(UserProduction o) {
        return repository.save(o);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

	public List<UserProduction> findByFarmId(String id) {
		return repository.findByFarmId(id);
	}
}