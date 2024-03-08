

public class Main {

    public static void main(String[] args) {
       Ser meuSerAnimal = new Pessoa("Nicollas", 17, "Nascimento" );
       Ser meuSerHumano = new Cachorro("George", 3, "Macaco" );
       meuSerAnimal.setNome("Nicollas");
       System.out.println(meuSerAnimal.saudacao());
       System.out.println(meuSerHumano.saudacao());
    }
}