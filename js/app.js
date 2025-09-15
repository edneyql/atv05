// Dados (iguais aos do Main.java)
const edificio = { nome: 'Residencial Aurora', endereco: 'Av. Central, 123' };
const moradores = [
  { nome: 'Ana Lima', cpf: '111.222.333-44', codigoAcesso: 'AX-101' },
  { nome: 'Bruno Souza', cpf: '222.333.444-55', codigoAcesso: 'BX-201' },
  { nome: 'Carla Nunes', cpf: '333.444.555-66', codigoAcesso: 'CX-301' },
  { nome: 'Diego Alves', cpf: '444.555.666-77', codigoAcesso: 'DX-404' },
  { nome: 'Eva Martins', cpf: '555.666.777-88', codigoAcesso: 'EX-502' },
];
const apartamentos = [
  { numero: 101, andar: 1, bloco: 'A', morador: moradores[0] },
  { numero: 201, andar: 2, bloco: 'A', morador: moradores[1] },
  { numero: 301, andar: 3, bloco: 'B', morador: moradores[2] },
  { numero: 404, andar: 4, bloco: 'B', morador: moradores[3] },
  { numero: 502, andar: 5, bloco: 'C', morador: moradores[4] },
];

function show(id){
  ['apartamentos','moradores','edificio','saida'].forEach(sec=>{
    document.getElementById(sec).classList.toggle('hide', sec!==id);
  });
}
function renderApartamentos(){
  const el = document.getElementById('lista-apartamentos');
  el.innerHTML = apartamentos.map(ap => `
    <div class="item">
      <h3>Apartamento ${ap.numero}</h3>
      <div class="badge">Bloco ${ap.bloco} • Andar ${ap.andar}</div>
      <p style="margin:.5rem 0 0 0"><strong>Morador:</strong> ${ap.morador.nome}</p>
      <p class="muted" style="margin:.25rem 0 0 0">CPF: ${ap.morador.cpf} • Código: ${ap.morador.codigoAcesso}</p>
      <p class="muted" style="margin:.25rem 0 0 0"><strong>Edifício:</strong> ${edificio.nome} (${edificio.endereco})</p>
    </div>
  `).join('');
}
function renderMoradores(){
  const el = document.getElementById('lista-moradores');
  el.innerHTML = moradores.map(m => `
    <div class="item">
      <h3>${m.nome}</h3>
      <p class="muted">CPF: ${m.cpf}</p>
      <p class="muted">Código de acesso: ${m.codigoAcesso}</p>
    </div>
  `).join('');
}
function renderEdificio(){
  const el = document.querySelector('#info-edificio .result-body');
  el.innerHTML = `<ul style="margin:0;padding-left:18px">
    <li><strong>Nome:</strong> ${edificio.nome}</li>
    <li><strong>Endereço:</strong> ${edificio.endereco}</li>
    <li><strong>Unidades:</strong> ${apartamentos.length}</li>
  </ul>`;
}
function renderSaida(){
  show('saida');
  const lines = apartamentos.map(ap => [
    `Apartamento ${ap.numero} — Bloco ${ap.bloco}, Andar ${ap.andar}`,
    `Edifício: ${edificio.nome} (${edificio.endereco})`,
    `Morador:  Nome: ${ap.morador.nome}, CPF: ${ap.morador.cpf}, Código de Acesso: ${ap.morador.codigoAcesso}`,
    '----------------------------------------'
  ].join('\n')).join('\n');
  document.getElementById('saida-text').textContent = lines;
  document.getElementById('card-saida').classList.add('show');
}
renderApartamentos();
renderMoradores();
renderEdificio();
show('apartamentos');
