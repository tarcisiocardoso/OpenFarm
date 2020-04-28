package br.com.farm.adm.model;
// import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import org.springframework.data.annotation.Id;

@Document(collection = "user")
public class User {
    @Id
    private String id;

    private String name;

    private String email;

    public String login;

    private String imageUrl;

    private Boolean emailVerified = false;

    // @JsonIgnore
    private String password;

    private AuthProvider provider;

    private String providerId;

    public List <String>perfis;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getPassword() {
        return password;
    }
    
    public String getLogin() {
        return login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String toString(){
        return this.name+":["+this.perfis+"]";
    }
}
