package br.com.farm.adm;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.com.farm.adm.model.SolicitacaoProducao;
import br.com.farm.adm.repository.SolicitacaoProducaoRepository;

@SpringBootTest
class AdmApplicationTests {

	@Autowired
	SolicitacaoProducaoRepository repository;
	
	@Test
	void contextLoads() {
		List<SolicitacaoProducao> lst = repository.findSolicitacaoProducaoAberta();
		for(SolicitacaoProducao sp: lst ){
			System.out.println("====>"+ sp.data );
			
		}
	}

}
