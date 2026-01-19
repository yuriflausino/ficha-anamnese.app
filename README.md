# Ficha de Anamnese – Sistema de Registro de Pacientes

## 🚀 Descrição

Sistema web desenvolvido para **gerenciar atendimentos e pacientes** em clínicas ou consultórios.  
Permite registrar pacientes, visualizar informações detalhadas, registrar atendimentos, excluir registros e acompanhar todos os dados de cada paciente.

É um projeto fullstack simples usando **Node.js, Express e SQLite** no backend, e HTML/CSS/JavaScript no frontend.

---

## 📋 Funcionalidades

- Registro de pacientes (create)  
- Visualização de pacientes cadastrados (read)  
- Consulta detalhada de dados do paciente  
- Registro de atendimentos por paciente  
- Exclusão de pacientes e atendimentos (delete)  
- Interface simples e intuitiva para fácil navegação  

---

## 🛠 Tecnologias utilizadas

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **Banco de dados:** SQLite  
- **Outros:** body-parser, fs  

---

## 💻 Como rodar o projeto localmente

### 1️⃣ Clonar o repositório
Abra o terminal e execute:

  ```bash
   git clone https://github.com/yuriflausino/ficha-anamnese.git
   cd ficha-anamnese
 ``` 
 ### 2️⃣ Instalar dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

### 3️⃣ Inicializar o banco de dados

```bash
node init-db.js
```
### 4️⃣ Rodar o servidor

No terminal:

```bash
node server.js
```

🚀 Servidor rodando em http://localhost:3000

### 5️⃣ Acessar o frontend

Abra o navegador e acesse:

- O formulário de cadastro estará disponível  
- As rotas da API:
  - `GET /api/pacientes` → lista todos os pacientes  
  - `POST /api/pacientes` → adiciona paciente  
  - `POST /api/atendimentos` → adiciona atendimento  
  - `GET /api/atendimentos/:pacienteId` → lista atendimentos de um paciente

### 6️⃣ Observações importantes

- **Não suba o arquivo `database.db` para o GitHub** → adicione no `.gitignore`  
- Para deploy online, considere usar **banco na nuvem** (Supabase, MongoDB Atlas, Railway)  
- O frontend está na pasta `public/` (HTML, CSS, JS)  
- Para resetar os dados, rode novamente `node init-db.js`






