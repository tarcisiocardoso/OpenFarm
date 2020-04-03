package br.com.farm.adm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.farm.adm.model.Post;
import br.com.farm.adm.model.UserPost;
import br.com.farm.adm.repository.PostRepository;
import br.com.farm.adm.repository.UserPostFluxRepository;
import br.com.farm.adm.repository.UserPostRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author Taimoor Choudhary
 */
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserPostRepository userPostRepository;

    @Autowired
    UserPostFluxRepository fluxRepository;

    @GetMapping("/{id}")
    public Mono<Post> getPost(@PathVariable String id) {
        return postRepository.findById(id);
    }

    @GetMapping(path = "/user/{idUser}")
    public List<UserPost> getUserPost(@PathVariable String idUser) {
        return userPostRepository.findByIdUser(idUser);
    }

    @GetMapping(path = "/sse/{idUser}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @CrossOrigin(origins = "http://localhost:3000")
    public Flux<UserPost> getPostsNew(@PathVariable String idUser) {
        // return this.events.map(pce -> {
        // try {
        // return objectMapper.writeValueAsString(pce) + "\n\n";
        // } catch (JsonProcessingException e) {
        // throw new RuntimeException(e);
        // }
        // });
        // return PostRepository.findAll();
        System.out.println(">>>"+idUser+"<<: ");

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return fluxRepository.findAllByIdUser(idUser);
        
    }


}
