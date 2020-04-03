package br.com.farm.adm.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ovino")
public class Ovino {
    @Id
    public String id;
    public String sexo;
    public String raca;

    public Ovino(){}

    @Override
    public String toString() {
        return "{id=" + id + ", sexo=" + sexo + ", raca=" + raca + "}";
    }
}