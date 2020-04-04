package br.com.farm.adm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import br.com.farm.adm.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class AdmApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(AdmApplication.class, args);
	}
}
