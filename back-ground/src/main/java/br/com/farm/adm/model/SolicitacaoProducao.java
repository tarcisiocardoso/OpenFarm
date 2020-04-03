package br.com.farm.adm.model;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "solicitacaoProducao")
public class SolicitacaoProducao{
    @Id
    public String id;

    public byte status=0; //0 - aberto, 1 - processando, 2 - concluido
    public Date data;
    public String tipo;
    public String idUser;
    public String userAgent;
    public Entrada entrada;

    public static class Entrada{
        public Object user;
        public SistemaProducao producao;
    }

}