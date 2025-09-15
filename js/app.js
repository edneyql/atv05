// ========== CLASSES (construtor + get/set) ==========
class Pessoa {
  #nome;
  constructor(nome){ this.setNome(nome); }
  getNome(){ return this.#nome; }
  setNome(nome){
    if(!nome || !nome.trim()) throw new Error("Nome inválido");
    this.#nome = nome.trim();
  }
  // getter JS opcional (não é exigência, mas ajuda)
  get nome(){ return this.#nome; }
  toString(){ return this.#nome; }
}

class Morador extends Pessoa {
  #cpf; #codigoAcesso;
  constructor(nome, cpf, codigoAcesso){
    super(nome);
    this.setCpf(cpf);
    this.setCodigoAcesso(codigoAcesso);
  }
  getCpf(){ return this.#cpf; }
  setCpf(v){
    if(!v || !v.trim()) throw new Error("CPF inválido");
    this.#cpf = v.trim();
  }
  getCodigoAcesso(){ return this.#codigoAcesso; }
  setCodigoAcesso(v){
    if(!v || !v.trim()) throw new Error("Código inválido");
    this.#codigoAcesso = v.trim();
  }
  // getters JS compatíveis
  get cpf(){ return this.#cpf }
  get codigoAcesso(){ return this.#codigoAcesso }
}

class Edificio {
  #nome;
  constructor(nome){ this.setNome(nome); }
  getNome(){ return this.#nome; }
  setNome(v){
    if(!v || !v.trim()) throw new Error("Edifício inválido");
    this.#nome = v.trim();
  }
  get nome(){ return this.#nome; }
  toString(){ return this.#nome; }
}

class Apartamento {
  #numero; #andar; #bloco; #edificio; #morador;
  constructor(numero, andar, bloco, edificio, morador){
    this.setNumero(numero);
    this.setAndar(andar);
    this.setBloco(bloco);
    this.setEdificio(edificio);
    this.setMorador(morador);
  }
  getNumero(){ return this.#numero; }
  setNumero(n){
    n = Number(n);
    if(!Number.isFinite(n) || n <= 0) throw new Error("Número inválido");
    this.#numero = n;
  }
  getAndar(){ return this.#andar; }
  setAndar(a){
    a = Number(a);
    if(!Number.isFinite(a) || a <= 0) throw new Error("Andar inválido");
    this.#andar = a;
  }
  getBloco(){ return this.#bloco; }
  setBloco(b){
    if(!b || !b.trim()) throw new Error("Bloco inválido");
    this.#bloco = b.trim();
  }
  getEdificio(){ return this.#edificio; }
  setEdificio(e){
    if(!(e instanceof Edificio)) throw new Error("Edifício inválido");
    this.#edificio = e;
  }
  getMorador(){ return this.#morador; }
  setMorador(m){
    if(!(m instanceof Morador)) throw new Error("Morador inválido");
    this.#morador = m;
  }

  // getters JS adicionais (conveniência)
  get numero(){ return this.#numero }
  get andar(){ return this.#andar }
  get bloco(){ return this.#bloco }
  get edificio(){ return this.#edificio }
  get morador(){ return this.#morador }

  mostrarDadosApartamento(){
    return [
      `Edifício: ${this.edificio.toString()}`,
      `Apto: ${this.numero} • Andar: ${this.andar} • Bloco: ${this.bloco}`,
      `Morador: ${this.morador.getNome()} • CPF ${this.morador.getCpf()} • Código ${this.morador.getCodigoAcesso()}`
    ].join("\n");
  }
}

// ========== MAIN (exigência da atividade) ==========
// Cria 5 instâncias de Apartamento e chama mostrarDadosApartamento() para cada uma.
function main(){
  const moradores = [
    new Morador("Ana Lima","123.456.789-00","A1B2C3"),
    new Morador("Bruno Souza","987.654.321-00","77XZK1"),
    new Morador("Clara Nunes","111.222.333-44","K9LMN8"),
    new Morador("Diego Alves","555.666.777-88","ZP0QW2"),
    new Morador("Eva Prado","000.111.222-33","5H7J9K")
  ];

  const edificios = [
    new Edificio("Residencial Aurora"),
    new Edificio("Parque das Flores"),
    new Edificio("Solar das Árvores"),
    new Edificio("Jardins do Sol"),
    new Edificio("Mirante Azul")
  ];

  const apartamentos = [
    new Apartamento(101, 1, "A", edificios[0], moradores[0]),
    new Apartamento(202, 2, "B", edificios[1], moradores[1]),
    new Apartamento(704, 7, "C", edificios[1], moradores[2]),
    new Apartamento(502, 5, "A", edificios[1], moradores[3]),
    new Apartamento(305, 3, "A", edificios[0], moradores[4]),
  ];

  // Saída exigida (console) + render na tela
  const saida = document.getElementById("saida");
  saida.textContent = ""; // limpa
  apartamentos.forEach((ap, i) => {
    const texto = ap.mostrarDadosApartamento();
    console.log(texto);
    saida.textContent += `#${i+1}\n${texto}\n\n`;
  });
}

// ========== Inicialização e botões ==========
window.addEventListener("load", () => {
  console.log("Página carregou — executando Main automaticamente.");
  main(); // execução automática para cumprir a exigência
});

document.getElementById("btn-main").addEventListener("click", () => {
  main();
});

document.getElementById("btn-limpar").addEventListener("click", () => {
  document.getElementById("saida").textContent = "";
});
