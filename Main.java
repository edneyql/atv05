public class Main {
    public static void main(String[] args) {
        // Edifício
        Edificio ed = new Edificio("Residencial Aurora", "Av. Central, 123");

        // Moradores
        Morador m1 = new Morador("Ana Lima", "111.222.333-44", "AX-101");
        Morador m2 = new Morador("Bruno Souza", "222.333.444-55", "BX-201");
        Morador m3 = new Morador("Carla Nunes", "333.444.555-66", "CX-301");
        Morador m4 = new Morador("Diego Alves", "444.555.666-77", "DX-404");
        Morador m5 = new Morador("Eva Martins", "555.666.777-88", "EX-502");

        // Cinco apartamentos
        Apartamento a1 = new Apartamento(101, ed, 1, "A", m1);
        Apartamento a2 = new Apartamento(201, ed, 2, "A", m2);
        Apartamento a3 = new Apartamento(301, ed, 3, "B", m3);
        Apartamento a4 = new Apartamento(404, ed, 4, "B", m4);
        Apartamento a5 = new Apartamento(502, ed, 5, "C", m5);

        // Mostrar dados
        a1.mostrarDadosApartamento();
        a2.mostrarDadosApartamento();
        a3.mostrarDadosApartamento();
        a4.mostrarDadosApartamento();
        a5.mostrarDadosApartamento();
    }
}
