package br.com.farm.adm.security;


import br.com.farm.adm.exception.ResourceNotFoundException;
import br.com.farm.adm.model.User;
import br.com.farm.adm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String login)
            throws UsernameNotFoundException {
                
                System.out.println(">>CustomUserDetailsService - loadUserByUsername<< 1: "+login);
        // User user = userRepository.findByEmail(login)
        //         .orElseThrow(() ->
        //                 new UsernameNotFoundException("User not found with email : " + login)
        // );
        
        User user = userRepository.findByLogin(login);
        System.out.println(">>CustomUserDetailsService - loadUserByUsername<< 2" + user );
        if( user == null ){
            System.out.println(">>CustomUserDetailsService - loadUserByUsername<< 3");
            throw new UsernameNotFoundException("User not found with email : " + login);
            
        }
        System.out.println(">>CustomUserDetailsService - loadUserByUsername<< 5");
        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(String id) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", id)
        );

        System.out.println(">>CustomUserDetailsService<< 2");
        // User user = userRepository.findById(id);
        // if( user == null ){
        //     throw new ResourceNotFoundException("User", "id", id);
        // }

        return UserPrincipal.create(user);
    }
}