package br.com.farm.adm.model;
// import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.data.annotation.Id;

@Document(collection = "user")
public class User {
    @Id
    public String id;

    public String name;

    public String toString(){
        return this.name;
    }
}
