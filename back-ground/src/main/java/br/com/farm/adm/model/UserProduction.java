package br.com.farm.adm.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userProduction")
public class UserProduction {
    @Id
    public String id;

    public byte status=0; //ativo, inativo, suspenso, com problema, ...
    public List<String> proprietarios;
    public Date dtCriacao;
    public Date dtUpdate;

    public String idProducao;
    public String nomeProducao;

    public Object dados; 

}