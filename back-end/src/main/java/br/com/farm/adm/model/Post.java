package br.com.farm.adm.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "post")
public class Post {

    @Id
    public String id;
    
    public String titulo;
    public String assunto;
    public String categoria;
    public String conteudo;

    public Date dtCriacao;
    public Date dtUpdate;

    public String criador;

    public boolean isLido=false;

    public String[] subPost;

    public String toString(){ return "{ id: "+id+", titulo: "+titulo+", criador: "+criador+"}"; }
}