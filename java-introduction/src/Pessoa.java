
public class Pessoa extends Ser {

    String sobrenome;
    public Pessoa(String nome, int idade, String sobrenome){
        super(nome, idade);
        this.sobrenome = sobrenome;
    }
 void criaMain(){
     this.idade = 17;
 }

    @Override
    public String saudacao(){
        return "Ola, meu nome e Nicollas";
    }
}


