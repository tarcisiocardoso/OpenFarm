package br.com.farm.adm;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import br.com.farm.adm.model.Post;
import br.com.farm.adm.service.PostUserLookupService;
import br.com.farm.adm.service.SolicitacaoProducaoService;

import java.util.concurrent.CompletableFuture;

@Component
public class AppRunner implements CommandLineRunner {

  // private static final Logger logger = LoggerFactory.getLogger(AppRunner.class);

  private final PostUserLookupService gitHubLookupService;

  private final SolicitacaoProducaoService solicitacaoProducaoService;

  public AppRunner(PostUserLookupService gitHubLookupService, SolicitacaoProducaoService service) {
    this.gitHubLookupService = gitHubLookupService;
    this.solicitacaoProducaoService = service;
  }

  @Override
  public void run(String... args) throws Exception {
    // Start the clock
    // long start = System.currentTimeMillis();

    

    // Kick of multiple, asynchronous lookups
    CompletableFuture<Post> page1 = gitHubLookupService.creatUserPost();
    solicitacaoProducaoService.execSolicitacaoProducao();

    // Wait until they are all done
    CompletableFuture.allOf(page1).join();

    // Print results, including elapsed time
    // logger.info("Elapsed time: " + (System.currentTimeMillis() - start));
    // logger.info("--> " + page1.get());

    Thread.sleep(10000L);
    run(args);

  }

}