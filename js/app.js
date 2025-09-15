// ========== CLASSES (construtor + get/set) ==========
class Pessoa {
  #nome;
  constructor(nome){ this.setNome(nome); }
  getNome(){ return this.#nome; }
  setNome(nome){ if(!nome||!nome.trim()) throw new Error("Nome inválido"); this.#nome = nome.trim(); }
  // getter JS opcional
  get nome(){ return this.#nome; }
  toString(){ return this.#nome; }
}

class Morador extends Pessoa {
  #cpf; #codigoAcesso;
  constructor(nome, cpf, codigoAcesso){ super(nome); this.setCpf(cpf); this.setCodigoAcesso(codigoAcesso); }
  getCpf(){ return this.#cpf; } setCpf(v){ if(!v||!v.trim()) throw new Error("CPF inválido"); this.#cpf = v.trim(); }
  getCodigoAcesso(){ return this.#codigoAcesso; } setCodigoAcesso(v){ if(!v||!v.trim()) throw new Error("Código inválido"); this.#codigoAcesso = v.trim(); }
  get cpf(){ return this.#cpf } get codigoAcesso(){ return this.#codigoAcesso }
}

class Edificio {
  #nome;
  constructor(nome){ this.setNome(nome); }
  getNome(){ return this.#nome; } setNome(v){ if(!v||!v.trim()) throw new Error("Edifício inválido"); this.#nome = v.trim(); }
  get nome(){ return this.#nome; }
  toString(){ return this.#nome; }
}

class Apartamento {
  #numero; #andar; #bloco; #edificio; #morador;
  constructor(numero, andar, bloco, edificio, morador){
    this.setNumero(numero); this.setAndar(andar); this.setBloco(bloco);
    this.setEdificio(edificio); this.setMorador(morador);
  }
  getNumero(){ return this.#numero; } setNumero(n){ n=Number(n); if(!Number.isFinite(n)||n<=0) throw new Error("Número inválido"); this.#numero=n; }
  getAndar(){ return this.#andar; } setAndar(a){ a=Number(a); if(!Number.isFinite(a)||a<=0) throw new Error("Andar inválido"); this.#andar=a; }
  getBloco(){ return this.#bloco; } setBloco(b){ if(!b||!b.trim()) throw new Error("Bloco inválido"); this.#bloco=b.trim(); }
  getEdificio(){ return this.#edificio; } setEdificio(e){ if(!(e instanceof Edificio)) throw new Error("Edifício inválido"); this.#edificio=e; }
  getMorador(){ return this.#morador; } setMorador(m){ if(!(m instanceof Morador)) throw new Error("Morador inválido"); this.#morador=m; }

  // getters JS auxiliares
  get numero(){ return this.#numero } get andar(){ return this.#andar }
  get bloco(){ return this.#bloco } get edificio(){ return this.#edificio } get morador(){ return this.#morador }

  mostrarDadosApartamento(){
    return [
      `Edifício: ${this.getEdificio().getNome()}`,
      `Apto: ${this.getNumero()} • Andar: ${this.getAndar()} • Bloco: ${this.getBloco()}`,
      `Morador: ${this.getMorador().getNome()} • CPF ${this.getMorador().getCpf()} • Código ${this.getMorador().getCodigoAcesso()}`
    ].join(" | ");
  }
}

// ========== ESTADO / HELPERS ==========
const state = { moradores:[], edificios:[], apartamentos:[], sel:{morador:-1, edificio:-1, apartamento:-1} };
const $ = id => document.getElementById(id);
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

function toast(msg){
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 1800);
}
function applyFilter(ul, filtro){
  const q = (filtro||"").toLowerCase();
  ul.querySelectorAll("li").forEach(li=>{
    li.style.display = li.textContent.toLowerCase().includes(q) ? "" : "none";
  });
}

// ========== TABS ==========
qsa(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    qsa(".tab").forEach(b=>b.classList.remove("active"));
    qsa(".panel").forEach(p=>p.classList.remove("active"));
    btn.classList.add("active");
    $(btn.dataset.tab).classList.add("active");
    if(btn.dataset.tab === "geral") renderGeral();
  });
});

// ========== RENDERIZAÇÕES ==========
function renderMoradores(filtro=""){
  const ul = $("lista-morador"); ul.innerHTML = "";
  state.moradores.forEach((m,i)=>{
    const li = document.createElement("li");
    li.className = "card"; li.dataset.index = i;
    li.innerHTML = `
      <div class="row">
        <strong>${m.getNome()}</strong>
        <span class="tag">CPF ${m.getCpf()}</span>
        <span class="tag">Código ${m.getCodigoAcesso()}</span>
      </div>
      <div class="actions">
        <button class="editar secondary">Editar</button>
        <button class="excluir ghost">Excluir</button>
      </div>`;
    ul.appendChild(li);
  });
  if(filtro) applyFilter(ul, filtro);
}

function renderEdificios(filtro=""){
  const ul = $("lista-edif"); ul.innerHTML = "";
  state.edificios.forEach((e,i)=>{
    const li = document.createElement("li");
    li.className = "card"; li.dataset.index = i;
    li.innerHTML = `
      <div class="row"><strong>${e.getNome()}</strong></div>
      <div class="actions">
        <button class="editar secondary">Editar</button>
        <button class="excluir ghost">Excluir</button>
      </div>`;
    ul.appendChild(li);
  });
  if(filtro) applyFilter(ul, filtro);
}

function renderSelectsApto(){
  $("a-edif").innerHTML = state.edificios.map((e,i)=> `<option value="${i}">${e.getNome()}</option>`).join("");
  $("a-morador").innerHTML = state.moradores.map((m,i)=> `<option value="${i}">${m.getNome()} — ${m.getCpf()}</option>`).join("");
}

function renderApartamentos(filtro=""){
  const ul = $("lista-apto"); ul.innerHTML = "";
  state.apartamentos.forEach((a,i)=>{
    const li = document.createElement("li");
    li.className = "card"; li.dataset.index = i;
    li.innerHTML = `
      <div class="row">
        <strong>${a.getEdificio().getNome()}</strong>
        <span class="tag">Bloco ${a.getBloco()}</span>
        <span class="tag">Andar ${a.getAndar()}</span>
        <span class="tag">Apto ${a.getNumero()}</span>
      </div>
      <div class="muted">Morador: ${a.getMorador().getNome()} — CPF ${a.getMorador().getCpf()} — Código ${a.getMorador().getCodigoAcesso()}</div>
      <div class="actions">
        <button class="mostrar">Mostrar</button>
        <button class="editar secondary">Editar</button>
        <button class="excluir ghost">Excluir</button>
      </div>`;
    ul.appendChild(li);
  });
  if(filtro) applyFilter(ul, filtro);
}

function renderGeral(){
  const root = $("visao-geral");
  root.innerHTML = "";
  // agrupar por edifício
  state.edificios.forEach(ed=>{
    const group = document.createElement("div");
    group.className = "card";
    group.innerHTML = `<h3 style="margin:0 0 8px 0;">${ed.getNome()}</h3>`;
    const inner = document.createElement("ul");
    inner.style.listStyle = "none"; inner.style.margin = "0"; inner.style.padding = "0"; inner.style.display = "grid"; inner.style.gap = "8px";

    const aps = state.apartamentos.filter(a => a.getEdificio() === ed);
    if(aps.length === 0){
      const li = document.createElement("li");
      li.className = "muted";
      li.textContent = "Sem apartamentos cadastrados para este edifício.";
      inner.appendChild(li);
    } else {
      aps.forEach(a=>{
        const li = document.createElement("li");
        li.className = "card"; // mini-card dentro do card do edifício
        li.style.padding = "10px";
        li.innerHTML = `
          <div class="row">
            <span class="tag">Bloco ${a.getBloco()}</span>
            <span class="tag">Andar ${a.getAndar()}</span>
            <span class="tag">Apto ${a.getNumero()}</span>
            <strong style="margin-left:auto">Morador: ${a.getMorador().getNome()}</strong>
          </div>`;
        inner.appendChild(li);
      });
    }

    group.appendChild(inner);
    root.appendChild(group);
  });
}

// ========== EVENTOS CRUD (Moradores) ==========
$("lista-morador").addEventListener("click", (e)=>{
  const li = e.target.closest("li.card"); if(!li) return;
  const idx = Number(li.dataset.index);
  if(e.target.matches(".editar")){
    state.sel.morador = idx;
    const m = state.moradores[idx];
    $("m-nome").value = m.getNome();
    $("m-cpf").value = m.getCpf();
    $("m-codigo").value = m.getCodigoAcesso();
  } else if(e.target.matches(".excluir")){
    e.stopPropagation();
    if(confirm("Excluir morador?")){
      const usado = state.apartamentos.some(a => a.getMorador() === state.moradores[idx]);
      if(usado) return alert("Não é possível excluir: morador vinculado a um apartamento.");
      state.moradores.splice(idx,1);
      renderMoradores($("filtro-morador").value);
      renderSelectsApto(); renderApartamentos($("filtro-apto").value); renderGeral();
    }
  }
});

$("form-morador").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const nome = $("m-nome").value, cpf = $("m-cpf").value, cod = $("m-codigo").value;
    if(state.sel.morador >= 0){
      const m = state.moradores[state.sel.morador];
      m.setNome(nome); m.setCpf(cpf); m.setCodigoAcesso(cod);
      state.sel.morador = -1;
    } else {
      state.moradores.push(new Morador(nome, cpf, cod));
    }
    e.target.reset();
    renderMoradores($("filtro-morador").value);
    renderSelectsApto(); renderApartamentos($("filtro-apto").value); renderGeral();
    toast("Morador salvo.");
  }catch(err){ alert(err.message); }
});

$("morador-novo").addEventListener("click", ()=>{
  state.sel.morador = -1;
  $("form-morador").reset();
});

$("filtro-morador").addEventListener("keyup", e=> renderMoradores(e.target.value));

// ========== EVENTOS CRUD (Edifícios) ==========
$("lista-edif").addEventListener("click", (e)=>{
  const li = e.target.closest("li.card"); if(!li) return;
  const idx = Number(li.dataset.index);
  if(e.target.matches(".editar")){
    state.sel.edificio = idx;
    $("e-nome").value = state.edificios[idx].getNome();
  } else if(e.target.matches(".excluir")){
    e.stopPropagation();
    if(confirm("Excluir edifício?")){
      const usado = state.apartamentos.some(a => a.getEdificio() === state.edificios[idx]);
      if(usado) return alert("Não é possível excluir: edifício vinculado a um apartamento.");
      state.edificios.splice(idx,1);
      renderEdificios($("filtro-edif").value);
      renderSelectsApto(); renderApartamentos($("filtro-apto").value); renderGeral();
    }
  }
});

$("form-edif").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const nome = $("e-nome").value;
    if(state.sel.edificio >= 0){
      state.edificios[state.sel.edificio].setNome(nome);
      state.sel.edificio = -1;
    } else {
      state.edificios.push(new Edificio(nome));
    }
    e.target.reset();
    renderEdificios($("filtro-edif").value);
    renderSelectsApto(); renderApartamentos($("filtro-apto").value); renderGeral();
    toast("Edifício salvo.");
  }catch(err){ alert(err.message); }
});

$("edif-novo").addEventListener("click", ()=>{
  state.sel.edificio = -1;
  $("form-edif").reset();
});

$("filtro-edif").addEventListener("keyup", e=> renderEdificios(e.target.value));

// ========== EVENTOS CRUD (Apartamentos) ==========
$("lista-apto").addEventListener("click", (e)=>{
  const li = e.target.closest("li.card"); if(!li) return;
  const idx = Number(li.dataset.index);
  const a = state.apartamentos[idx];
  if(e.target.matches(".mostrar")){
    alert(a.mostrarDadosApartamento());
  } else if(e.target.matches(".editar")){
    state.sel.apartamento = idx;
    $("a-numero").value = a.getNumero();
    $("a-andar").value = a.getAndar();
    $("a-bloco").value = a.getBloco();
    $("a-edif").value = state.edificios.indexOf(a.getEdificio());
    $("a-morador").value = state.moradores.indexOf(a.getMorador());
  } else if(e.target.matches(".excluir")){
    e.stopPropagation();
    if(confirm("Excluir apartamento?")){
      state.apartamentos.splice(idx,1);
      renderApartamentos($("filtro-apto").value); renderGeral();
      toast("Apartamento removido.");
    }
  }
});

$("form-apto").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const numero = $("a-numero").value, andar = $("a-andar").value, bloco = $("a-bloco").value;
    const edif = state.edificios[Number($("a-edif").value)];
    const mor  = state.moradores[Number($("a-morador").value)];
    if(state.sel.apartamento >= 0){
      const a = state.apartamentos[state.sel.apartamento];
      a.setNumero(numero); a.setAndar(andar); a.setBloco(bloco); a.setEdificio(edif); a.setMorador(mor);
      state.sel.apartamento = -1;
      toast("Apartamento atualizado.");
    } else {
      state.apartamentos.push(new Apartamento(numero, andar, bloco, edif, mor));
      toast("Apartamento cadastrado.");
    }
    e.target.reset();
    renderApartamentos($("filtro-apto").value); renderGeral();
  }catch(err){ alert(err.message); }
});

$("apto-novo").addEventListener("click", ()=>{
  state.sel.apartamento = -1;
  $("form-apto").reset();
});

$("filtro-apto").addEventListener("keyup", e=> renderApartamentos(e.target.value));

// ========== SEED PRÉ-ESTABELECIDO (5 moradores, 3 edifícios, 5 apartamentos) ==========
function seedBase(){
  // moradores
  state.moradores.push(
    new Morador("Ana Lima","123.456.789-00","A1B2C3"),
    new Morador("Bruno Souza","987.654.321-00","77XZK1"),
    new Morador("Clara Nunes","111.222.333-44","K9LMN8"),
    new Morador("Diego Alves","555.666.777-88","ZP0QW2"),
    new Morador("Eva Prado","000.111.222-33","5H7J9K")
  );
  // edifícios
  state.edificios.push(
    new Edificio("Residencial Aurora"),
    new Edificio("Parque das Flores"),
    new Edificio("Solar das Árvores")
  );
  // apartamentos (5)
  state.apartamentos.push(
    new Apartamento(101,1,"A", state.edificios[0], state.moradores[0]),
    new Apartamento(202,2,"B", state.edificios[1], state.moradores[1]),
    new Apartamento(704,7,"C", state.edificios[1], state.moradores[2]),
    new Apartamento(502,5,"A", state.edificios[1], state.moradores[3]),
    new Apartamento(305,3,"A", state.edificios[0], state.moradores[4]),
  );
}

// ========== INICIALIZAÇÃO ==========
window.addEventListener("load", ()=>{
  seedBase();                          // dados pré-estabelecidos
  renderMoradores(); renderEdificios(); renderSelectsApto();
  renderApartamentos(); renderGeral(); // já aparece na aba Geral
});
