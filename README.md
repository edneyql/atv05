# Atividade 05 — Frontend (HTML/CSS/JS)

Este projeto implementa, em **JavaScript (ES6)**, as classes do enunciado (Pessoa, Morador, Edificio, Apartamento) e uma “Main” na página, **sem back-end**.

- **Classes** com validação e método `mostrarDadosApartamento()` em `js/app.js`.
- **Eventos**: `submit`, `click` (delegação no container da lista), `keyup`, `load`, `beforeunload`, além de `preventDefault` e `stopPropagation`.
- **Assíncrono**: simulação de latência com `Promise` + `setTimeout` via helpers `delay()` e funções `async/await`.

## Como rodar
Abra `index.html` no navegador. Não requer build.

## O que entregar
Suba este diretório no seu repositório e informe a **URL do GitHub** no TXT no AVA como solicitado no enunciado.

## Como avaliar
1. **Modelagem**: verifique a existência das classes `Pessoa`, `Morador extends Pessoa`, `Edificio`, `Apartamento` e método `mostrarDadosApartamento()`.
2. **Instâncias**: clique em **“Gerar 5 exemplos (Main)”** para criar 5 instâncias e veja as chamadas de `mostrarDadosApartamento()` no console.
3. **Cadastro manual**: preencha o formulário e adicione um apartamento.
4. **Eventos**: há `preventDefault` no submit, delegação de clique na lista, filtro com `keyup`, `load` e `beforeunload`.
5. **Assíncrono**: a criação e os exemplos simulam latência com `delay()` e usam `async/await`.

## Prints sugeridos para o relatório
1. Página carregada (formulário e lista vazia).
2. Console mostrando “Página carregou” e as saídas de `mostrarDadosApartamento()` após gerar os 5 exemplos.
3. Cadastro manual bem-sucedido (mensagem “Apartamento cadastrado.” e item na lista).
4. Filtro funcionando (lista reduzida).
5. Alerta `beforeunload` (com itens na lista).

