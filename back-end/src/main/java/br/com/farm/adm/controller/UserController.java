package br.com.farm.adm.controller;

import br.com.farm.adm.exception.ResourceNotFoundException;
import br.com.farm.adm.model.User;
import br.com.farm.adm.repository.UserRepository;
import br.com.farm.adm.security.CurrentUser;
import br.com.farm.adm.security.UserPrincipal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        // User user = userRepository.findById(userPrincipal.getId());
        // if( user == null ){
        //     throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
        // }
        // return user;
    }

    @GetMapping("/api/login/{login}, method = RequestMethod.GET")
    @PreAuthorize("hasRole('USER')")
    public User getLogin(@PathVariable("login") String login) {
        // return userRepository.findById(userPrincipal.getId())
        //         .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        User user = userRepository.findByLogin(login);
        if( user == null ){
            throw new ResourceNotFoundException("User", "id", login);
        }
        return user;
    }

    @PostMapping("/api/formMinhaConta")
    public void criarConta(@Valid @RequestBody User user){
        System.out.println(">>>>criarConta<<<<");
        System.out.println( user );

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.insert(user);
    }

}
