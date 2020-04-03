package br.com.farm.adm.controller.system;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.com.farm.adm.model.Post;
import br.com.farm.adm.service.PostService;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    ResourceLoader resourceLoader;

    @Autowired
    private PostService service;

    @RequestMapping(method = RequestMethod.GET, path = "/category", produces = "application/json;charset=UTF-8")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public Object montaBlogCategory( ) {

        return this.loadBlogCategory();
    }

    private Resource loadBlogCategory() {
        return resourceLoader.getResource(
          "classpath:data/blogCategory.json");
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Post> findById(@PathVariable("id") String id) {
        Post e = service.findById(id);
        HttpStatus status = e != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        
        return new ResponseEntity<Post>(e, status);
    }


    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void create(@RequestBody Post post) {
        System.out.println(">>>>create<<<<"+ post);
        post.dtCriacao = new Date();
        post.dtUpdate = post.dtCriacao;
        service.create(post);
    }
}