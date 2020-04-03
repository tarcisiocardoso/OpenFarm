package br.com.farm.adm.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sistemaProducao")
public class SistemaProducao{
    @Id
    public String id;

    @Indexed(unique=true)
    public String nome;
    public String descricao;
    public boolean ativo = true;

    public List<Object> regras;

    public String toString(){ return nome;}
}