# Atividade 05 — Gestão de Edifícios (Frontend)

**Objetivo:** Implementar, em JavaScript ES6, as classes `Pessoa`, `Morador` (extends `Pessoa`), `Edificio` e `Apartamento`, com **getters e setters** e o método `mostrarDadosApartamento()`. Uma “Main” cria **5 instâncias** e chama `mostrarDadosApartamento()`.

## O que este projeto entrega
- **Abas:** Moradores, Edifícios, Apartamentos e Vinculações.
- **Pré-cadastros**: moradores, edifícios e alguns apartamentos já criados.
- **CRUDs separados** e **vinculação** na aba “Vinculações” (troca de morador/edifício).
- **Eventos**: `submit`, `click` (delegação nas listas), `keyup`, `load`, `beforeunload`.
- **Assíncrono**: `async/await` + `setTimeout` para simular latência (geração “Main”).

## Como usar
1. Abra `index.html` no navegador.
2. Veja as listas pré-carregadas nas abas **Moradores** e **Edifícios**.
3. Em **Apartamentos**, crie/edite e selecione o **Edifício** e o **Morador** (combos populados pela base).
4. Em **Vinculações**, altere vínculos de qualquer apartamento e clique em **“Chamar mostrarDadosApartamento() no console”** para validar o método da classe.

## Como avaliar (checklist do enunciado)
- [x] 4 classes com construtor, **getters** e **setters**.
- [x] `Morador` estende `Pessoa`.
- [x] `Main` com **5 instâncias** (botão “Gerar 5 exemplos (Main)” cria e faz chamadas de `mostrarDadosApartamento()` no **console**).
- [x] Método `mostrarDadosApartamento()` mostra todos os dados do apartamento e do morador.
- [x] Uso de **eventos** e **assíncrono** (aula mais recente).

## Prints sugeridos
1. Tela de **Moradores** (pré-lista + filtro) e formulário preenchido.
2. Tela de **Edifícios** (lista + form).
3. Tela de **Apartamentos** após cadastrar um novo.
4. Tela de **Vinculações** com selects e botão “Aplicar vínculos”.
5. Console com as saídas de `mostrarDadosApartamento()`.

