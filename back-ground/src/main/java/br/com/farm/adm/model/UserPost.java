package br.com.farm.adm.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userPost")
public class UserPost {

    @Id
    public String id;

    public String idUser;
    public String idPost;

    public String info;

    public boolean isLido=false;
}
