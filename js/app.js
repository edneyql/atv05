// Atv05 - Frontend JS (ES6 classes + eventos + assíncrono)
class Pessoa {
  #nome;
  constructor(nome) {
    if (!nome || !nome.trim()) throw new Error("Nome inválido");
    this.#nome = nome.trim();
  }
  get nome() { return this.#nome; }
  toString() { return this.#nome; }
}

class Morador extends Pessoa {
  #cpf; #codigoAcesso;
  constructor(nome, cpf, codigoAcesso) {
    super(nome);
    if (!cpf || !cpf.trim()) throw new Error("CPF inválido");
    if (!codigoAcesso || !codigoAcesso.trim()) throw new Error("Código inválido");
    this.#cpf = cpf.trim();
    this.#codigoAcesso = codigoAcesso.trim();
  }
  get cpf(){ return this.#cpf; }
  get codigoAcesso(){ return this.#codigoAcesso; }
}

class Edificio {
  #nome; #bloco;
  constructor(nome, bloco) {
    if (!nome || !nome.trim()) throw new Error("Edifício inválido");
    if (!bloco || !bloco.trim()) throw new Error("Bloco inválido");
    this.#nome = nome.trim();
    this.#bloco = bloco.trim();
  }
  get nome(){ return this.#nome; }
  get bloco(){ return this.#bloco; }
  toString(){ return `${this.#nome} (Bloco ${this.#bloco})`; }
}

class Apartamento {
  #numero; #andar; #edificio; #morador;
  constructor(numero, andar, edificio, morador) {
    const n = Number(numero);
    const a = Number(andar);
    if (!Number.isFinite(n) || n <= 0) throw new Error("Número inválido");
    if (!Number.isFinite(a) || a <= 0) throw new Error("Andar inválido");
    if (!(edificio instanceof Edificio)) throw new Error("Edifício inválido");
    if (!(morador instanceof Morador)) throw new Error("Morador inválido");
    this.#numero = n;
    this.#andar = a;
    this.#edificio = edificio;
    this.#morador = morador;
  }
  get numero(){ return this.#numero; }
  get andar(){ return this.#andar; }
  get edificio(){ return this.#edificio; }
  get morador(){ return this.#morador; }

  mostrarDadosApartamento(){
    return [
      `Edifício: ${this.#edificio.toString()}`,
      `Apto: ${this.#numero} • Andar: ${this.#andar}`,
      `Morador: ${this.#morador.nome} • CPF: ${this.#morador.cpf} • Código: ${this.#morador.codigoAcesso}`
    ].join("\n");
  }
}

// Estado da aplicação (simples, em memória)
const state = {
  apartamentos: [],
};

// Helpers UI
const el = (id) => document.getElementById(id);
const lista = el('lista');
const msg = el('msg');

function render(filtro = ''){
  lista.innerHTML = '';
  const q = filtro.trim().toLowerCase();
  state.apartamentos
    .filter(a => {
      if (!q) return true;
      const alvo = [
        a.edificio.nome, a.edificio.bloco, a.andar, a.numero,
        a.morador.nome, a.morador.cpf, a.morador.codigoAcesso
      ].join(' ').toLowerCase();
      return alvo.includes(q);
    })
    .forEach((apto, idx) => {
      const li = document.createElement('li');
      li.className = 'card';
      li.dataset.index = idx;

      const header = document.createElement('div');
      header.className = 'row';
      header.innerHTML = `<strong>${apto.edificio.nome}</strong>
        <span class="tag">Bloco ${apto.edificio.bloco}</span>
        <span class="tag">Andar ${apto.andar}</span>
        <span class="tag">Apto ${apto.numero}</span>`;

      const mor = document.createElement('div');
      mor.className = 'muted';
      mor.textContent = `Morador: ${apto.morador.nome} — CPF: ${apto.morador.cpf} — Código: ${apto.morador.codigoAcesso}`;

      const actions = document.createElement('div');
      actions.className = 'actions';
      actions.innerHTML = `
        <button class="mostrar">Mostrar dados</button>
        <button class="excluir secondary">Excluir</button>
      `;

      li.appendChild(header);
      li.appendChild(mor);
      li.appendChild(actions);
      lista.appendChild(li);
    });
}

// Eventos
window.addEventListener('load', () => {
  console.log('Página carregou');
  render();
});

el('form-apto').addEventListener('submit', async (e) => {
  e.preventDefault(); // evita reload (ações default) — relacionado à aula
  const novo = await criarAptoDoFormularioComLatencia(); // simula assíncrono
  state.apartamentos.push(novo);
  render(el('filtro').value);
  e.target.reset();
  el('ed-nome').focus();
  flash('Apartamento cadastrado.');
});

// Delegação de eventos na lista (propagação controlada)
lista.addEventListener('click', (e) => {
  const card = e.target.closest('li.card');
  if (!card) return;
  const idx = Number(card.dataset.index);
  if (e.target.matches('.excluir')) {
    e.stopPropagation(); // controla propagação
    state.apartamentos.splice(idx, 1);
    render(el('filtro').value);
    flash('Apartamento removido.');
  } else if (e.target.matches('.mostrar')) {
    alert(state.apartamentos[idx].mostrarDadosApartamento());
  }
});

// Filtro ao digitar (keyup)
el('filtro').addEventListener('keyup', (e) => {
  render(e.target.value);
});

// Gerar 5 exemplos (Main) — chama mostrarDadosApartamento em cada um
el('btn-exemplos').addEventListener('click', async () => {
  const exemplos = await gerarExemplosComLatencia();
  state.apartamentos.push(...exemplos);
  render(el('filtro').value);
  // Chamada do método para cada instância criada
  exemplos.forEach(ap => console.log(ap.mostrarDadosApartamento()));
  flash('5 exemplos adicionados (veja o console para as chamadas de mostrarDadosApartamento).');
});

el('btn-limpar').addEventListener('click', () => {
  if (confirm('Limpar a lista inteira?')) {
    state.apartamentos.length = 0;
    render(el('filtro').value);
    flash('Lista limpa.');
  }
});

// Simulações assíncronas (relacionadas à aula: setTimeout/Promise/async/await)
function delay(ms){ return new Promise(res => setTimeout(res, ms)); }

async function criarAptoDoFormularioComLatencia(){
  await delay(400); // simula latência de rede
  const edif = new Edificio(el('ed-nome').value, el('bloco').value);
  const mor = new Morador(el('nome').value, el('cpf').value, el('codigo').value);
  const apto = new Apartamento(el('numero').value, el('andar').value, edif, mor);
  return apto;
}

async function gerarExemplosComLatencia(){
  await delay(600);
  const arr = [
    ["Residencial Aurora","A",1,101,"Ana Lima","123.456.789-00","A1B2C3"],
    ["Residencial Aurora","B",2,202,"Bruno Souza","987.654.321-00","77XZK1"],
    ["Parque das Flores","C",7,704,"Clara Nunes","111.222.333-44","K9LMN8"],
    ["Parque das Flores","A",5,502,"Diego Alves","555.666.777-88","ZP0QW2"],
    ["Solar das Árvores","D",3,306,"Eva Prado","000.111.222-33","5H7J9K"],
  ];
  return arr.map(([ed, bl, andar, numero, nome, cpf, cod]) => {
    const edif = new Edificio(ed, bl);
    const mor = new Morador(nome, cpf, cod);
    return new Apartamento(numero, andar, edif, mor);
  });
}

// UX helper
function flash(texto){
  msg.textContent = texto;
  setTimeout(() => { msg.textContent = ''; }, 2200);
}

// beforeunload: alerta se houver itens na lista (interação prévia)
window.addEventListener('beforeunload', (e) => {
  if (state.apartamentos.length > 0) {
    e.preventDefault();
    e.returnValue = '';
  }
});
