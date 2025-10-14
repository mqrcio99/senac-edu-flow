# 🎓 TecEdu - Sistema de Gestão de Cursos e Matrículas

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://senac-edu-flow.vercel.app/)
[![Status](https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge)](https://senac-edu-flow.vercel.app/)
[![SENAC](https://img.shields.io/badge/SENAC-Tramanda%C3%AD-blue?style=for-the-badge)](https://senac-edu-flow.vercel.app/)

> Sistema web completo para gerenciamento acadêmico desenvolvido como trabalho da disciplina **Planejar o Desenvolvimento de Software** do Curso Técnico em Desenvolvimento de Sistemas - SENAC Tramandaí/RS.

**🔗 [Acesse o Sistema ao Vivo](https://senac-edu-flow.vercel.app/)**

---

## 📋 Sobre o Projeto

O **TecEdu** é uma plataforma web desenvolvida para atender às necessidades da escola técnica fictícia TecEdu, permitindo a gestão completa de processos acadêmicos através de uma interface intuitiva e moderna.

### 🎯 Objetivo

Desenvolver uma solução informatizada que permita:
- ✅ Cadastro e gestão de cursos
- ✅ Organização de turmas
- ✅ Controle de matrículas
- ✅ Registro de frequência e notas
- ✅ Emissão de certificados
- ✅ Gestão de diferentes perfis de usuários

---

## 📸 Screenshots

### Página Inicial
![Página Inicial](caminho/para/screenshot1.png)
*Interface principal com destaque para os números da plataforma e call-to-action*

### Catálogo de Cursos
![Catálogo de Cursos](caminho/para/screenshot2.png)
*Visualização dos cursos disponíveis com informações de carga horária, avaliações e número de alunos*

### Depoimentos e Histórias de Sucesso
![Depoimentos](caminho/para/screenshot3.png)
*Seção com feedbacks de alunos e benefícios da plataforma*

### Tela de Login
![Login](caminho/para/screenshot4.png)
*Interface de autenticação com design moderno e responsivo*

---

## ⚙️ Funcionalidades

### 📚 Requisitos Funcionais

- **Cadastro de Cursos**
  - Registrar nome, descrição, carga horária e pré-requisitos
  - Permitir edição e exclusão de cursos

- **Gestão de Turmas**
  - Criar turmas vinculadas a cursos
  - Definir capacidade mínima (5 grupos) e máxima

- **Sistema de Matrículas**
  - Matrícula de grupos em turmas
  - Validação automática de pré-requisitos
  - Cancelamento de turmas com menos de 5 grupos

- **Controle Acadêmico**
  - Registro de frequência dos alunos/grupos
  - Lançamento de notas
  - Cálculo automático de aproveitamento

- **Certificação**
  - Emissão de certificados para alunos com frequência mínima de 75%

### 🔒 Requisitos Não Funcionais

- **Usabilidade**: Interface simples e intuitiva
- **Segurança**: Sistema de autenticação com controle de permissões (admin, professor, secretaria, aluno/grupo)
- **Escalabilidade**: Suporte ao crescimento sem perda de desempenho
- **Disponibilidade**: Sistema online 24/7
- **Desempenho**: Respostas rápidas em operações críticas

---

## 📐 Regras de Negócio

1. 🎓 Grupos só podem se matricular em cursos para os quais possuam todos os pré-requisitos concluídos
2. 📜 Certificados são emitidos apenas para grupos com frequência ≥ 75%
3. ⚠️ Turmas com menos de 5 grupos são automaticamente canceladas

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js
- **Deploy**: Vercel
- **Versionamento**: Git/GitHub
- **Design**: Loveable (Prototipação)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tecedu.git

# Entre na pasta do projeto
cd tecedu

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:5173
```

### Deploy na Vercel

O projeto está configurado para deploy automático na Vercel. Qualquer push na branch `main` dispara um novo deploy.

---

## 📚 Metodologia de Trabalho

### Product Backlog

- ✅ Página de login
- ✅ Cadastro de novos alunos
- ✅ Tela de cursos disponíveis
- 🔄 Função de pagamento online
- 🔄 Relatórios de alunos matriculados

---

## 👨‍🏫 Informações Acadêmicas

**Instituição**: SENAC - Tramandaí/RS  
**Curso**: Técnico em Desenvolvimento de Sistemas  
**Disciplina**: Planejar o Desenvolvimento de Software  
**Professor**: Vinicius Possamai  
**Ano**: 2025

---

## 👥 Equipe de Desenvolvimento

Este projeto foi desenvolvido como trabalho acadêmico pelos alunos do curso Técnico em Desenvolvimento de Sistemas do SENAC Tramandaí.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso Técnico em Desenvolvimento de Sistemas do SENAC.

---

## 🔗 Links Úteis

- 🌐 **Deploy**: [https://senac-edu-flow.vercel.app/](https://senac-edu-flow.vercel.app/)
- 📂 **Repositório**: [GitHub](#)
- 📧 **Contato**: [Seu Email]

---

<div align="center">
  
**Desenvolvido com 💙 por alunos do SENAC Tramandaí**

#MudandoAVida 🚀

</div>
