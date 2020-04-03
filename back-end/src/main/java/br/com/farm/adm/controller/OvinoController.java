package br.com.farm.adm.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.farm.adm.model.Ovino;
import br.com.farm.adm.model.User;
import br.com.farm.adm.repository.UserRepository;
import br.com.farm.adm.service.OvinoService;

 
@RestController
@RequestMapping("/api/ovino")
public class OvinoController {

    @Autowired
    private OvinoService service;

    @Autowired
    private UserRepository userRepository;
    
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void create(@RequestBody Ovino e) {
        service.create(e);
    }
 
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Ovino> findById(@PathVariable("id") String id) {
        Ovino e = service.findById(id);
        HttpStatus status = e != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<Ovino>(e, status);
    }
 
    @RequestMapping(value = "/raca/{raca}", method = RequestMethod.GET)
    @ResponseBody
    public List<Ovino> findByRaca(@PathVariable("raca") String raca) {
        return service.findByRaca(raca);
    }
 
    @RequestMapping(value = "/login/{login}", method = RequestMethod.GET)
    public User getLogin(@PathVariable("login") String login) {
        // return userRepository.findById(userPrincipal.getId())
        //         .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        User user = userRepository.findByLogin(login);
        // if( user == null ){
        //     throw new ResourceNotFoundException("User", "id", login);
        // }
        return user;
    }


    @RequestMapping(method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public List<Ovino> findAll() {
        System.out.println(">>>>>> BUSCANDO OVINOS <<<<<");
        List<Ovino> emps = service.findAll();
        return emps;
    }
 
    @RequestMapping(method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public Ovino update(@RequestBody Ovino e) {
        return service.update(e);
    }
 
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") String id) {
        service.delete(id);
    }
}