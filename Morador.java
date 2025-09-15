public class Morador extends Pessoa {
    private String codigoAcesso;

    public Morador(String nome, String cpf, String codigoAcesso) {
        super(nome, cpf);
        this.codigoAcesso = codigoAcesso;
    }

    public String getCodigoAcesso() { return codigoAcesso; }
    public void setCodigoAcesso(String codigoAcesso) { this.codigoAcesso = codigoAcesso; }

    @Override
    public String toString() {
        return super.toString() + ", Código de Acesso: " + codigoAcesso;
    }
}
