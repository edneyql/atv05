// ========== CLASSES ==========
class Pessoa {
  #nome;
  constructor(nome){ this.setNome(nome); }
  getNome(){ return this.#nome; }
  setNome(nome){ if(!nome||!nome.trim()) throw new Error("Nome inválido"); this.#nome=nome.trim(); }
  get nome(){ return this.#nome; }
  toString(){ return this.#nome; }
}
class Morador extends Pessoa {
  #cpf; #codigoAcesso;
  constructor(nome, cpf, codigoAcesso){ super(nome); this.setCpf(cpf); this.setCodigoAcesso(codigoAcesso); }
  getCpf(){ return this.#cpf; } setCpf(v){ if(!v||!v.trim()) throw new Error("CPF inválido"); this.#cpf=v.trim(); }
  getCodigoAcesso(){ return this.#codigoAcesso; } setCodigoAcesso(v){ if(!v||!v.trim()) throw new Error("Código inválido"); this.#codigoAcesso=v.trim(); }
  get cpf(){ return this.#cpf } get codigoAcesso(){ return this.#codigoAcesso }
}
class Edificio {
  #nome;
  constructor(nome){ this.setNome(nome); }
  getNome(){ return this.#nome; } setNome(v){ if(!v||!v.trim()) throw new Error("Edifício inválido"); this.#nome=v.trim(); }
  get nome(){ return this.#nome; }
  toString(){ return this.#nome; }
}
class Apartamento {
  #numero; #andar; #bloco; #edificio; #morador;
  constructor(numero,andar,bloco,edificio,morador){
    this.setNumero(numero); this.setAndar(andar); this.setBloco(bloco);
    this.setEdificio(edificio); this.setMorador(morador);
  }
  getNumero(){ return this.#numero; } setNumero(n){n=Number(n);if(!Number.isFinite(n)||n<=0) throw new Error("Número inválido");this.#numero=n;}
  getAndar(){ return this.#andar; } setAndar(a){a=Number(a);if(!Number.isFinite(a)||a<=0) throw new Error("Andar inválido");this.#andar=a;}
  getBloco(){ return this.#bloco; } setBloco(b){if(!b||!b.trim()) throw new Error("Bloco inválido");this.#bloco=b.trim();}
  getEdificio(){ return this.#edificio; } setEdificio(e){if(!(e instanceof Edificio)) throw new Error("Edifício inválido");this.#edificio=e;}
  getMorador(){ return this.#morador; } setMorador(m){if(!(m instanceof Morador)) throw new Error("Morador inválido");this.#morador=m;}
  mostrarDadosApartamento(){
    return `Edifício: ${this.getEdificio().getNome()} | Apto ${this.getNumero()} • Andar ${this.getAndar()} • Bloco ${this.getBloco()} | Morador: ${this.getMorador().getNome()}`;
  }
}

// ========== ESTADO / HELPERS ==========
const state={moradores:[],edificios:[],apartamentos:[],sel:{morador:-1,edificio:-1,apartamento:-1}};
const $=id=>document.getElementById(id);
const qsa=(s,el=document)=>Array.from(el.querySelectorAll(s));
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1800);}

// ========== TABS ==========
qsa(".tab").forEach(btn=>{
  btn.addEventListener("click",()=>{
    qsa(".tab").forEach(b=>b.classList.remove("active"));
    qsa(".panel").forEach(p=>p.classList.remove("active"));
    btn.classList.add("active");
    $(btn.dataset.tab).classList.add("active");
    if(btn.dataset.tab==="geral") renderGeral();
  });
});

// ========== RENDER ==========
function filtrarLista(ul,filtro){const q=filtro.toLowerCase();ul.querySelectorAll("li").forEach(li=>{li.style.display=li.textContent.toLowerCase().includes(q)?"block":"none";});}

function renderMoradores(f=""){const ul=$("lista-morador");ul.innerHTML="";
  state.moradores.forEach((m,i)=>{const li=document.createElement("li");li.className="card";li.dataset.index=i;
    li.textContent=`${m.getNome()} • CPF ${m.getCpf()} • Código ${m.getCodigoAcesso()}`;ul.appendChild(li);});
  if(f)filtrarLista(ul,f);
}
function renderEdificios(f=""){const ul=$("lista-edif");ul.innerHTML="";
  state.edificios.forEach((d,i)=>{const li=document.createElement("li");li.className="card";li.dataset.index=i;
    li.textContent=d.getNome();ul.appendChild(li);});
  if(f)filtrarLista(ul,f);
}
function renderSelectsApto(){ $("a-edif").innerHTML=state.edificios.map((e,i)=>`<option value="${i}">${e.getNome()}</option>`).join("");
  $("a-morador").innerHTML=state.moradores.map((m,i)=>`<option value="${i}">${m.getNome()} — ${m.getCpf()}</option>`).join(""); }
function renderApartamentos(f=""){const ul=$("lista-apto");ul.innerHTML="";
  state.apartamentos.forEach((a,i)=>{const li=document.createElement("li");li.className="card";li.dataset.index=i;
    li.textContent=a.mostrarDadosApartamento();ul.appendChild(li);});
  if(f)filtrarLista(ul,f);
}
function renderGeral(){const div=$("visao-geral");div.innerHTML="";
  state.edificios.forEach(ed=>{
    const box=document.createElement("div");box.className="geral-edificio";
    const h=document.createElement("h3");h.textContent=ed.getNome();box.appendChild(h);
    const ul=document.createElement("ul");
    state.apartamentos.filter(a=>a.getEdificio()===ed).forEach(a=>{
      const li=document.createElement("li");
      li.textContent=`Apto ${a.getNumero()} • Bloco ${a.getBloco()} • Andar ${a.getAndar()} → Morador: ${a.getMorador().getNome()}`;
      ul.appendChild(li);
    });
    box.appendChild(ul);div.appendChild(box);
  });
}

// ========== CRUD MORADORES ==========
$("form-morador").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const nome=$("m-nome").value,cpf=$("m-cpf").value,cod=$("m-codigo").value;
    if(state.sel.morador>=0){const m=state.moradores[state.sel.morador];m.setNome(nome);m.setCpf(cpf);m.setCodigoAcesso(cod);state.sel.morador=-1;}
    else{state.moradores.push(new Morador(nome,cpf,cod));}
    e.target.reset();renderMoradores();renderSelectsApto();toast("Morador salvo.");
  }catch(err){alert(err.message);}
});
$("morador-novo").addEventListener("click",()=>{state.sel.morador=-1;$("form-morador").reset();});
$("filtro-morador").addEventListener("keyup",e=>renderMoradores(e.target.value));

// ========== CRUD EDIFICIOS ==========
$("form-edif").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const nome=$("e-nome").value;
    if(state.sel.edificio>=0){state.edificios[state.sel.edificio].setNome(nome);state.sel.edificio=-1;}
    else{state.edificios.push(new Edificio(nome));}
    e.target.reset();renderEdificios();renderSelectsApto();toast("Edifício salvo.");
  }catch(err){alert(err.message);}
});
$("edif-novo").addEventListener("click",()=>{state.sel.edificio=-1;$("form-edif").reset();});
$("filtro-edif").addEventListener("keyup",e=>renderEdificios(e.target.value));

// ========== CRUD APARTAMENTOS ==========
$("form-apto").addEventListener("submit",(e)=>{
  e.preventDefault();
  try{
    const numero=$("a-numero").value,andar=$("a-andar").value,bloco=$("a-bloco").value;
    const edif=state.edificios[Number($("a-edif").value)];const mor=state.moradores[Number($("a-morador").value)];
    if(state.sel.apartamento>=0){const a=state.apartamentos[state.sel.apartamento];a.setNumero(numero);a.setAndar(andar);a.setBloco(bloco);a.setEdificio(edif);a.setMorador(mor);state.sel.apartamento=-1;}
    else{state.apartamentos.push(new Apartamento(numero,andar,bloco,edif,mor));}
    e.target.reset();renderApartamentos();renderGeral();toast("Apartamento salvo.");
  }catch(err){alert(err.message);}
});
$("apto-novo").addEventListener("click",()=>{state.sel.apartamento=-1;$("form-apto").reset();});
$("filtro-apto").addEventListener("keyup",e=>renderApartamentos(e.target.value));

// ========== SEED ==========
function seedBase(){
  state.moradores.push(
    new Morador("Ana Lima","123","A1B2"),
    new Morador("Bruno Souza","456","B2C3"),
    new Morador("Clara Nunes","789","C3D4")
  );
  state.edificios.push(
    new Edificio("Residencial Aurora"),
    new Edificio("Parque das Flores")
  );
  state.apartamentos.push(
    new Apartamento(101,1,"A",state.edificios[0],state.moradores[0]),
    new Apartamento(202,2,"B",state.edificios[1],state.moradores[1])
  );
}

// ========== INIT ==========
window.addEventListener("load",()=>{
  seedBase();
  renderMoradores();renderEdificios();renderSelectsApto();renderApartamentos();renderGeral();
});
