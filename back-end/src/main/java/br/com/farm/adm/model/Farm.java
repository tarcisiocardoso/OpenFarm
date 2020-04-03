package br.com.farm.adm.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import br.com.farm.adm.util.LatLng;

public class Farm{

    @Id public String id;

    public String nome;
    public String area;

    public List<LatLng> localizacaoGeo;

    public Object proprietario;
    public Object responsavel;

    public String toString(){
        return nome;
    }
}