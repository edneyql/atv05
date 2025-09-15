// ======== Classes ========
class Pessoa {
  #nome; constructor(nome){ this.setNome(nome); }
  get nome(){ return this.#nome; }
  setNome(nome){ if(!nome||!nome.trim()) throw new Error("Nome inválido"); this.#nome = nome.trim(); }
  toString(){ return this.#nome; }
}
class Morador extends Pessoa {
  #cpf; #codigoAcesso;
  constructor(nome, cpf, codigoAcesso){ super(nome); this.setCpf(cpf); this.setCodigoAcesso(codigoAcesso); }
  get cpf(){ return this.#cpf } get codigoAcesso(){ return this.#codigoAcesso }
  setCpf(v){ if(!v||!v.trim()) throw new Error("CPF inválido"); this.#cpf = v.trim(); }
  setCodigoAcesso(v){ if(!v||!v.trim()) throw new Error("Código inválido"); this.#codigoAcesso = v.trim(); }
}
class Edificio {
  #nome; constructor(nome){ this.setNome(nome); }
  get nome(){ return this.#nome; }
  setNome(v){ if(!v||!v.trim()) throw new Error("Edifício inválido"); this.#nome = v.trim(); }
  toString(){ return this.#nome; }
}
class Apartamento {
  #numero; #andar; #bloco; #edificio; #morador;
  constructor(numero, andar, bloco, edificio, morador){
    this.setNumero(numero); this.setAndar(andar); this.setBloco(bloco);
    this.setEdificio(edificio); this.setMorador(morador);
  }
  get numero(){ return this.#numero } get andar(){ return this.#andar }
  get bloco(){ return this.#bloco } get edificio(){ return this.#edificio }
  get morador(){ return this.#morador }
  setNumero(n){ n=Number(n); if(!Number.isFinite(n)||n<=0) throw new Error("Número inválido"); this.#numero=n; }
  setAndar(a){ a=Number(a); if(!Number.isFinite(a)||a<=0) throw new Error("Andar inválido"); this.#andar=a; }
  setBloco(b){ if(!b||!b.trim()) throw new Error("Bloco inválido"); this.#bloco=b.trim(); }
  setEdificio(e){ if(!(e instanceof Edificio)) throw new Error("Edifício inválido"); this.#edificio=e; }
  setMorador(m){ if(!(m instanceof Morador)) throw new Error("Morador inválido"); this.#morador=m; }
  mostrarDadosApartamento(){
    return [
      `Edifício: ${this.edificio.toString()}`,
      `Apto: ${this.numero} • Andar: ${this.andar} • Bloco: ${this.bloco}`,
      `Morador: ${this.morador.nome} • CPF: ${this.morador.cpf} • Código: ${this.morador.codigoAcesso}`
    ].join("\n");
  }
}

// ======== Estado ========
const state = {
  moradores: [],
  edificios: [],
  apartamentos: [],
  sel: { morador:-1, edificio:-1, apartamento:-1 }
};

// ======== Helpers UI ========
const $ = id => document.getElementById(id);
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

function flash(el, txt){ el.textContent = txt; setTimeout(()=> el.textContent="", 2000); }
function toast(msg){
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 1800);
}

// ======== Tabs ========
qsa(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    qsa(".tab").forEach(b=>b.classList.remove("active"));
    qsa(".panel").forEach(p=>p.classList.remove("active"));
    btn.classList.add("active");
    $(`${btn.dataset.tab}`).classList.add("active");
  });
});

// ======== Renderizações ========
function renderMoradores(filtro=""){
  const ul = $("lista-morador"); ul.innerHTML="";
  const q = filtro.trim().toLowerCase();
  state.moradores
    .filter(m => !q || `${m.nome} ${m.cpf}`.toLowerCase().includes(q))
    .forEach((m,i)=>{
      const li = document.createElement("li"); li.className="card"; li.dataset.index=i;
      li.innerHTML = `
        <div class="row">
          <strong>${m.nome}</strong>
          <span class="tag">CPF ${m.cpf}</span>
          <span class="tag">Código ${m.codigoAcesso}</span>
        </div>
        <div class="actions">
          <button class="editar secondary">Editar</button>
          <button class="excluir ghost">Excluir</button>
        </div>`;
      ul.appendChild(li);
    });
}
function renderEdificios(filtro=""){
  const ul = $("lista-edif"); ul.innerHTML="";
  const q = filtro.trim().toLowerCase();
  state.edificios
    .filter(e => !q || e.nome.toLowerCase().includes(q))
    .forEach((ed,i)=>{
      const li = document.createElement("li"); li.className="card"; li.dataset.index=i;
      li.innerHTML = `
        <div class="row"><strong>${ed.nome}</strong></div>
        <div class="actions">
          <button class="editar secondary">Editar</button>
          <button class="excluir ghost">Excluir</button>
        </div>`;
      ul.appendChild(li);
    });
}
function renderSelectsApto(){
  $("a-edif").innerHTML = state.edificios.map((e,i)=> `<option value="${i}">${e.nome}</option>`).join("");
  $("a-morador").innerHTML = state.moradores.map((m,i)=> `<option value="${i}">${m.nome} — ${m.cpf}</option>`).join("");
}
function renderApartamentos(filtro=""){
  const ul = $("lista-apto"); ul.innerHTML="";
  const q = filtro.trim().toLowerCase();
  state.apartamentos
    .filter(a => {
      const alvo = `${a.bloco} ${a.andar} ${a.numero} ${a.morador.nome} ${a.edificio.nome}`.toLowerCase();
      return !q || alvo.includes(q);
    })
    .forEach((a,i)=>{
      const li = document.createElement("li"); li.className="card"; li.dataset.index=i;
      li.innerHTML = `
        <div class="row">
          <strong>${a.edificio.nome}</strong>
          <span class="tag">Bloco ${a.bloco}</span>
          <span class="tag">Andar ${a.andar}</span>
          <span class="tag">Apto ${a.numero}</span>
        </div>
        <div class="muted">Morador: ${a.morador.nome} — CPF ${a.morador.cpf} — Código ${a.morador.codigoAcesso}</div>
        <div class="actions">
          <button class="mostrar">Mostrar</button>
          <button class="editar secondary">Editar</button>
          <button class="excluir ghost">Excluir</button>
        </div>`;
      ul.appendChild(li);
    });
}
function renderVinculos(filtro=""){
  const ul = $("lista-vinc"); ul.innerHTML="";
  const q = filtro.trim().toLowerCase();
  state.apartamentos
    .filter(a => {
      const alvo = `${a.edificio.nome} ${a.bloco} ${a.andar} ${a.numero} ${a.morador.nome} ${a.morador.cpf}`.toLowerCase();
      return !q || alvo.includes(q);
    })
    .forEach((a,i)=>{
      const li = document.createElement("li"); li.className="card"; li.dataset.index=i;
      const optsEd = state.edificios.map((e,ix)=> `<option value="${ix}" ${e===a.edificio?"selected":""}>${e.nome}</option>`).join("");
      const optsMo = state.moradores.map((m,ix)=> `<option value="${ix}" ${m===a.morador?"selected":""}>${m.nome} — ${m.cpf}</option>`).join("");
      li.innerHTML = `
        <div class="row">
          <strong>Vincular</strong>
          <span class="tag">Apto ${a.numero}</span>
          <span class="tag">Andar ${a.andar}</span>
          <span class="tag">Bloco ${a.bloco}</span>
        </div>
        <div class="row">
          <label>Edifício</label>
          <select class="sel-edif">${optsEd}</select>
          <label>Morador</label>
          <select class="sel-morador">${optsMo}</select>
        </div>
        <div class="actions">
          <button class="aplicar">Aplicar vínculos</button>
          <button class="mostrar ghost">Mostrar dados</button>
        </div>`;
      ul.appendChild(li);
    });
}

// ======== Moradores (CRUD) ========
$("lista-morador").addEventListener("click", (e)=>{
  const li = e.target.closest("li.card"); if(!li) return;
  const idx = Number(li.dataset.index);
  if(e.target.matches(".editar")){
    state.sel.morador = idx;
    const m = state.moradores[idx];
    $("m-nome").value = m.nome; $("m-cpf").value = m.cpf; $("m-codigo").value = m.codigoAcesso;
  } else if (e.target.matches(".excluir")){
    e.stopPropagation();
    if(confirm("Excluir morador?")){
      const usado = state.apartamentos.some(a => a.morador === state.moradores[idx]);
      if(usado) return alert("Não é possível excluir: morador vinculado a um apartamento.");
      state.moradores.splice(idx,1);
      renderMoradores($("filtro-morador").value); renderSelectsApto(); renderVinculos($("filtro-vinc").value);
    }
  }
});
$("form-morador").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const nome=$("m-nome").value, cpf=$("m-cpf").value, cod=$("m-codigo").value;
    if(state.sel.morador>=0){ const m=state.moradores[state.sel.morador]; m.setNome(nome); m.setCpf(cpf); m.setCodigoAcesso(cod); state.sel.morador=-1; }
    else{ state.moradores.push(new Morador(nome,cpf,cod)); }
    e.target.reset(); $("m-nome").focus();
    renderMoradores($("filtro-morador").value); renderSelectsApto(); renderVinculos($("filtro-vinc").value);
    flash($("msg-morador"), "Morador salvo.");
  }catch(err){ alert(err.message); }
});
$("morador-novo").addEventListener("click", ()=> { state.sel.morador=-1; $("form-morador").reset(); $("m-nome").focus(); });
$("filtro-morador").addEventListener("keyup", e=> renderMoradores(e.target.value));

// ======== Edifícios (CRUD) ========
$("lista-edif").addEventListener("click", (e)=>{
  const li = e.target.closest("li.card"); if(!li) return;
  const idx = Number(li.dataset.index);
  if(e.target.matches(".editar")){
    state.sel.edificio = idx;
    const d = state.edificios[idx];
    $("e-nome").value = d.nome;
  } else if(e.target.matches(".excluir")){
    e.stopPropagation();
    if(confirm("Excluir edifício?")){
      const usado = state.apartamentos.some(a => a.edificio === state.edificios[idx]);
      if(usado) return alert("Não é possível excluir: edifício vinculado a um apartamento.");
      state.edificios.splice(idx,1);
      renderEdificios($("filtro-edif").value); renderSelectsApto(); renderVinculos($("filtro-vinc").value);
    }
  }
});
$("form-edif").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const nome = $("e-nome").value;
    if(state.sel.edificio>=0){ const d=state.edificios[state.sel.edificio]; d.setNome(nome); state.sel.edificio=-1; }
    else{ state.edificios.push(new Edificio(nome)); }
    e.target.reset(); $("e-nome").focus();
    renderEdificios($("filtro-edif").value); renderSelectsApto(); renderVinculos($("filtro-vinc").value);
    flash($("msg-edif"), "Edifício salvo.");
  }catch(err){ alert(err.message); }
});
$("edif-novo").addEventListener("click", ()=> { state.sel.edificio=-1; $("form-edif").reset(); $("e-nome").focus(); });
$("filtro-edif").addEventListener("keyup", e=> renderEdificios(e.target.value));

// ======== Apartamentos (CRUD) ========
$("lista-apto").addEventListener("click", (e)=>{
  const li = e.target.closest("li.card"); if(!li) return;
  const idx = Number(li.dataset.index); const a=state.apartamentos[idx];
  if(e.target.matches(".mostrar")){ alert(a.mostrarDadosApartamento()); }
  else if(e.target.matches(".editar")){
    state.sel.apartamento = idx;
    $("a-numero").value = a.numero; $("a-andar").value = a.andar; $("a-bloco").value=a.bloco;
    $("a-edif").value = state.edificios.indexOf(a.edificio);
    $("a-morador").value = state.moradores.indexOf(a.morador);
  } else if(e.target.matches(".excluir")){
    e.stopPropagation();
    if(confirm("Excluir apartamento?")){
      state.apartamentos.splice(idx,1);
      renderApartamentos($("filtro-apto").value); renderVinculos($("filtro-vinc").value);
    }
  }
});
$("form-apto").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const numero=$("a-numero").value, andar=$("a-andar").value, bloco=$("a-bloco").value;
    const edif = state.edificios[Number($("a-edif").value)];
    const mor  = state.moradores[Number($("a-morador").value)];
    if(state.sel.apartamento>=0){
      const a=state.apartamentos[state.sel.apartamento];
      a.setNumero(numero); a.setAndar(andar); a.setBloco(bloco); a.setEdificio(edif); a.setMorador(mor);
      state.sel.apartamento=-1;
    }else{
      state.apartamentos.push(new Apartamento(numero, andar, bloco, edif, mor));
    }
    e.target.reset(); $("a-numero").focus();
    renderApartamentos($("filtro-apto").value); renderVinculos($("filtro-vinc").value);
    flash($("msg-apto"), "Apartamento salvo.");
  }catch(err){ alert(err.message); }
});
$("apto-novo").addEventListener("click", ()=> { state.sel.apartamento=-1; $("form-apto").reset(); $("a-numero").focus(); });
$("filtro-apto").addEventListener("keyup", e=> renderApartamentos(e.target.value));

// ======== Vinculações ========
$("lista-vinc").addEventListener("click",(e)=>{
  const li = e.target.closest("li.card"); if(!li) return;
  const idx = Number(li.dataset.index); const ap = state.apartamentos[idx];
  if(e.target.matches(".aplicar")){
    const selEd = qs(".sel-edif", li); const selMo = qs(".sel-morador", li);
    ap.setEdificio(state.edificios[Number(selEd.value)]);
    ap.setMorador(state.moradores[Number(selMo.value)]);
    renderApartamentos($("filtro-apto").value); renderVinculos($("filtro-vinc").value);
    li.classList.add("blink"); setTimeout(()=> li.classList.remove("blink"), 850);
    toast("Vínculo atualizado com sucesso");
  }else if(e.target.matches(".mostrar")){
    alert(ap.mostrarDadosApartamento());
  }
});
$("filtro-vinc").addEventListener("keyup", e=> renderVinculos(e.target.value));
$("btn-console").addEventListener("click", ()=> {
  state.apartamentos.forEach(a => console.log(a.mostrarDadosApartamento()));
  toast("Veja o console do navegador");
});
$("btn-gerar-main").addEventListener("click", async ()=>{
  await delay(500);
  const exemplos = gerarExemplos();
  state.apartamentos.push(...exemplos);
  renderApartamentos($("filtro-apto").value); renderVinculos($("filtro-vinc").value);
  toast("5 exemplos adicionados (Main)");
});

// ======== Seed / exemplos / init ========
function delay(ms){ return new Promise(r=>setTimeout(r,ms)); }
function seed(){
  state.moradores.push(
    new Morador("Ana Lima","123.456.789-00","A1B2C3"),
    new Morador("Bruno Souza","987.654.321-00","77XZK1"),
    new Morador("Clara Nunes","111.222.333-44","K9LMN8"),
    new Morador("Diego Alves","555.666.777-88","ZP0QW2")
  );
  state.edificios.push(
    new Edificio("Residencial Aurora"),
    new Edificio("Parque das Flores"),
    new Edificio("Solar das Árvores")
  );
  state.apartamentos.push(
    new Apartamento(101,1,"A", state.edificios[0], state.moradores[0]),
    new Apartamento(202,2,"B", state.edificios[1], state.moradores[1])
  );
}
function gerarExemplos(){
  const arr = [
    [704,7,"C", state.edificios[1], state.moradores[2]],
    [502,5,"A", state.edificios[1], state.moradores[3]],
    [306,3,"D", new Edificio("Jardins do Sol"), new Morador("Eva Prado","000.111.222-33","5H7J9K")],
    [1201,12,"E", new Edificio("Mirante Azul"), new Morador("Felipe Ramos","222.333.444-55","9Q2W3E")],
    [305,3,"A", state.edificios[0], state.moradores[0]],
  ];
  return arr.map(([n,a,b,e,m]) => new Apartamento(n,a,b,e,m));
}
window.addEventListener("load", ()=>{
  seed(); renderMoradores(); renderEdificios(); renderSelectsApto(); renderApartamentos(); renderVinculos();
});

// beforeunload apenas se houve interação
let interacted=false; document.addEventListener("click", ()=> interacted=true, {once:true});
window.addEventListener("beforeunload",(e)=>{ if(interacted){ e.preventDefault(); e.returnValue=""; }});
