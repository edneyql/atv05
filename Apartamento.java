public class Apartamento {
    private int numero;
    private Edificio edificio;
    private int andar;
    private String bloco;
    private Morador morador;

    public Apartamento(int numero, Edificio edificio, int andar, String bloco, Morador morador) {
        this.numero = numero;
        this.edificio = edificio;
        this.andar = andar;
        this.bloco = bloco;
        this.morador = morador;
    }

    public int getNumero() { return numero; }
    public void setNumero(int numero) { this.numero = numero; }

    public Edificio getEdificio() { return edificio; }
    public void setEdificio(Edificio edificio) { this.edificio = edificio; }

    public int getAndar() { return andar; }
    public void setAndar(int andar) { this.andar = andar; }

    public String getBloco() { return bloco; }
    public void setBloco(String bloco) { this.bloco = bloco; }

    public Morador getMorador() { return morador; }
    public void setMorador(Morador morador) { this.morador = morador; }

    public void mostrarDadosApartamento() {
        System.out.println("Apartamento " + numero + " — Bloco " + bloco + ", Andar " + andar);
        System.out.println("Edifício: " + edificio.toString());
        System.out.println("Morador:  " + morador.toString());
        System.out.println("----------------------------------------");
    }
}
