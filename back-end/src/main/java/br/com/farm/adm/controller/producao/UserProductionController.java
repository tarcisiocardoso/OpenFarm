package br.com.farm.adm.controller.producao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.farm.adm.model.UserProduction;
import br.com.farm.adm.service.UserProductionService;

@RestController
@RequestMapping("/api/userProduction")
public class UserProductionController {

    @Autowired
    UserProductionService service;

    @RequestMapping(value = "/userId/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<UserProduction>> findByUserId(@PathVariable("id") String id) {
        List<UserProduction> lst = service.findByUserId(id);
        HttpStatus status = lst != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<List<UserProduction>>(lst, status);
    }

    @RequestMapping(value = "/farmId/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<UserProduction>> findByFarmId(@PathVariable("id") String id) {
        List<UserProduction> lst = service.findByFarmId(id);
        HttpStatus status = lst != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<List<UserProduction>>(lst, status);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<UserProduction> findById(@PathVariable("id") String id) {
        UserProduction e = service.findById(id);
        HttpStatus status = e != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<UserProduction>(e, status);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public UserProduction create(@RequestBody UserProduction e) {
        return service.create(e);
    }

}