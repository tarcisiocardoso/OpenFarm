package br.com.farm.adm.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "fazenda")
public class Fazenda{

    @Id
    public String id;
    public Identificacao identificacao;
    public List<String> proprietarios;
    public List<Gasto> gastos;

    public Object matrizClima;


    public static class Identificacao{
        public String nome;
        public int tamanho;
        public String cep;
        public String endereco;
        public String cidade;
        public String estado;
        public String uf;
        public String telefone;
        public String email;
        public String responsavel;
        public int chuva;
        public int temperatura;
        public int estiagemInicio;
        public int estiagemFim;
    }
    public static class Gasto{
        public String nome;
        public float valor;
        public String tipo; //mensal, semestral, bimestral
        public String descricao;
    }
    
}
