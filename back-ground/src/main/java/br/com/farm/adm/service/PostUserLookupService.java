package br.com.farm.adm.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import br.com.farm.adm.model.Post;
import br.com.farm.adm.model.User;
import br.com.farm.adm.model.UserPost;
import br.com.farm.adm.repository.PostNormalRepository;
import br.com.farm.adm.repository.UserPostFluxRepository;
import br.com.farm.adm.repository.UserPostRepository;
import br.com.farm.adm.repository.UserRepository;

import java.util.concurrent.CompletableFuture;

@Service
public class PostUserLookupService {

  private static final Logger logger = LoggerFactory.getLogger(PostUserLookupService.class);

  @Autowired
  PostNormalRepository postRepository;
  @Autowired
  UserPostRepository userPostRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  UserPostFluxRepository fluxRepository;
  

//   private final RestTemplate restTemplate;

//   public PostUserLookupService(RestTemplateBuilder restTemplateBuilder) {
//     this.restTemplate = restTemplateBuilder.build();
//   }

  @Async
  public CompletableFuture<Post> creatUserPost() throws InterruptedException {
    
    // String url = String.format("http://localhost:8081/post");
    // Post results = restTemplate.getForObject(url, Post.class);
    // Artificial delay of 1s for demonstration purposes
    Post results =new Post();
    results.assunto="lalalala";
    results.titulo="aaaaaaaaaaaa";

    postRepository.findNovosPost().forEach(post ->{
      logger.info("-->"+ post );

      userRepository.findAll().forEach(user -> {
        logger.info(">>>>" + user );
        createNewUserPost(post, user);
      });

      post.isLido = true;
      postRepository.save( post );

    });

    return CompletableFuture.completedFuture(results);
  }

  private void createNewUserPost(Post post, User user) {
    if( post.criador.equals( user.id )) return;

    try{
      //TODO definir regra para saber se um determinado user vai receber aquele post ou não
      UserPost up = new UserPost();
      up.idPost = post.id;
      up.idUser = user.id;

      up.isLido = false;
      up.info = post.titulo.isEmpty()? post.conteudo.substring(0, 50): post.titulo;

      userPostRepository.insert( up );
    }catch(Exception e){
      //TODO mandar um poste para os administradores do sistem
      e.printStackTrace();
    }
  }

}