# Aplicação WEB com as seguintes funções:

- Cadastro de usuário
- Login/logout
- Atualização do Cadastro do usuário
- Cadastro de produtos/transação
- Listamge de produtos/transações
- Edição de produto/transação
- Exclusão de produto/transação

## Banco de dados
Foi construíndo um Banco de Dados PostgreSQL chamado `aplicacao_final` contendo as seguintes tabelas e colunas: 

- usuarios
    - id
    - nome
    - email (campo unico)
    - senha

- produtos
    - id
    - nome
    - descricao
    - ativo

- Transacoes
    - id
    - descricao
    - valor
    - data
    - tipo
    - usuario_id

**Dentro dos arquivos do projeto se encontra o Schema para construção do Banco de Dados**

## **Endpoints**

### Cadastro usuário
#### `POST` `/usuario`
Rota destinada ao cadastro dos usuários. 

O body será constituido de um objeto seguindo o exemplo de abaixo.

- Middleware:
    - Validar se o e-mail informado já existe.
    - Criptografar a senha antes de persistir no banco de dados.

**Requisição**:

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```
**Respostas:**
```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```
### **Login do usuário**
#### `POST` `/login`

Essa é a rota que permite o usuario já cadastrado realizar o login no sistema.

- **Requisição**
Sem informar parâmetro de rota ou query.
O body deverá possuir um objeto respeitando as seguintes propriedades e nomes:
- email
- senha
 
- **Resposta**

    Em caso de sucesso, o body da resposta deverá possuir um objeto com a propriedade **token** que possui o valor do token de autenticação gerado e uma propriedade **usuario** que possui as informações do usúario autenticado, exceto a senha do usuário.

- **Middleware**
    - Validação de compos obrigatórios (email, senha)
    - Validar a existência desse e-mail no banco de dados
    - Validar e-mail e senha
    - Geração do Token com id do usuário

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```
## **Aviso importante**

**Todas as funcionalidades a seguir, exigirão o token de autenticação do usuário logado dentro do header em formato de Barer Token.**

- Agora todos os endpoints realizarão a seguinte informação:

      - Validar se o token foi enviado no header da requisição (Bearer Token)
      - Verificar se o token é válido
      - Consultar usuário no banco de dados pelo id contido no token informado

### **Logout do usuário**
#### `POST` `/logout`

Essa é a rota que permite o usuario já cadastrado sair do sistema.

- **Requisição**
Sem informar parâmetro de rota ou query ou no corpo da requisição.
 
- **Resposta**

    Em caso de sucesso, o body recebera um objeto contendo o conteúdo mensage informando que o usuario foi deslogado.


#### **Exemplo de requisição**

```javascript
// POST /logout
//sem paramentros no corpot da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
   "mensagem": "Usuário deslogado com sucesso"
}
```

```javascript
// HTTP Status 500 
{
    "mensagem": "Erro interno"
}
```

### **Detalhar usuário**
#### `GET` `/usuario`

Rota chamada para listar informações do próprio perfil do usuário.

**OBS:** O usuário será identificado através do ID presente no token de autenticação.

- **Requisição**

    Sem parâmetros de rota ou de query.
    Sem conteúdo no body da requisição.

- **Resposta**

    Em caso de sucesso, o body será devolvido com um objeto que repsenta o usuário encontrado, com todas as suas propriedades (exceto a senha).
    
    Em caso de falha na validação, a resposta surgirá com um objeto informando o status code no body.

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamda quando o usuário quiser realizar alterações no seu próprio usuário.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

- **Resposta**  
  Em caso de sucesso, receberemos o status code como resposta.  
  Em caso de falha na validação, a resposta terá um status code apropriado, e no body um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

- **Middleware**
    
    - Validação de compos obrigatórios(nome, email, senha)
    - Validar se o e-mail já é utilizado por outro usuario
    - Criptografia da senha informada.

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

### Cadastro produto
#### `POST` `/produto`
Rota destinada ao cadastro dos produtos. 

O body será constituido de um objeto seguindo o exemplo de abaixo.

- Middleware:
    - Serão validados de todos os campos estão preenchidos.

**Requisição**:

```javascript
// POST /produto
{
    "nome": "Computador",
    "descricao": "Desktop"
}
```
**Respostas:**
```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "Computador",
    "descricao": "Desktop",
}
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Preencha todos os campos para realizar o cadastro."
}
```

### **Atualizar produto do usuário logado**

#### `PUT` `/produto/:id`

Essa rota é utilizada para realizar a atualização de algum produto cadastrado por esse usuario.

- **Requisição**  
  Deverá ser enviado o ID do produto como parâmetro de rota do endpoint.  
  O body da requisição deverá possuir um objeto com as propriedades nome e descrição. 


- **Resposta**  
  Em caso de sucesso, não receberemos conteúdo no corpo (body) da resposta.  
  Em caso de falha na validação, a resposta possuirá status code apropriado, e em seu corpo (body) com um objeto mensagem que deverá possuir como valor um texto explicando o motivo da falha.

- **Middleware**
    - Validação se existe produto para o ID enviado como parâmetro de rota.
    - Validação se esse produto pertence ao usuario logado.
    - Validação se todos os campos foram preenchidos.

#### **Exemplo de requisição**

```javascript
// PUT /produto/2
{
	"nome": "Notebook",
    "descricao": "Fabricante Lenovo"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
### **Excluir produto**

#### `DELETE` `/produto/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma dos produtos cadastrados.  
É possível excluir apenas produtos  associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

Devemos ressaltar que nesse caso será alterado o campo `ativo` do produto, e deixará de ser listado. 

- **Requisição**  
  Será informado o ID do produto no parâmetro de rota do endpoint.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de sucesso, não teremos conteúdo no corpo (body) da resposta.  
  Em caso de falha na validação, a resposta contem o status code apropriado, e em seu corpo (body) com um objeto com a propriedade mensagem que deverá possuir como valor um texto o motivo da falha.

- **Middleware**:
  - Validação se existe produto para o id enviado como parâmetro na rota e se esta produto pertence ao usuário logado.

#### **Exemplo de requisição**

```javascript
// DELETE /produto/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Produtos não encontrado."
}
```
### **Listar produtos**

#### `GET` `/produtos`

Essa é a rota que será chamada quando o usuario logado quiser listar todos os produtos cadastrados por ele.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
  Em caso de sucesso, não teremos conteúdo no corpo (body) da resposta.  
  Em caso de falha na validação, a resposta contem o status code apropriado, e em seu corpo (body) com um objeto com a propriedade mensagem que deverá possuir como valor um texto o motivo da falha.



#### **Exemplo de requisição**

```javascript
// GET /produtos
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    id: 1,
    nome: "Notebook"
    descricao: "Marca Lenovo"
  },
  {
    id: 2,
    nome: "Impressora"
    descricao: "Modelo HP",
  },
];
```

```javascript
// HTTP Status 200 / 201 / 204
[];
```
### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.  

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (descricao,tipo, valor, data)

- **Resposta**
  Em caso de sucesso, receberemos no corpo (body) da resposta, as informações da transação cadastrada, incluindo seu respectivo `id`.  
  Em caso de falha na validação, a resposta será um status code apropriado, e em seu corpo (body) conterá um objeto com uma propriedade mensagem que possuí como valor um texto explicando o motivo da falha.

- **Middleware**
  - Validação os campos obrigatórios:
    - descricao
    - valor
    - data

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 3,
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.  

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**  
  Em caso de sucesso, não receberá conteúdo no corpo (body) da resposta.  
  Em caso de falha na validação, a resposta será um status code apropriado, e em seu corpo (body) um objeto com uma propriedade mensagem com o valor de um texto explicando o motivo da falha.

- **Middleware**
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Validação dos campos obrigatórios:
    - descricao
    - valor
    - data
    - tipo
  

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
	"descricao": "Sapato amarelo",
	"valor": 15800,
	"data": "2022-03-23 12:35:00",
	"tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.  

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de sucesso, não receberá conteúdo no corpo (body) da resposta.  
  Em caso de falha na validação, a resposta será um status code apropriado, e em seu corpo (body) um objeto com uma propriedade mensagem com o valor de um texto explicando o motivo da falha.

- **Middleware**:
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```

### **Listar transações**

#### `GET` `/transacaoes`

Essa é a rota que será chamada quando o usuario logado quiser listar todos os trasações cadastrados por ele.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
  Em caso de sucesso, não teremos conteúdo no corpo (body) da resposta.  
  Em caso de falha na validação, a resposta contem o status code apropriado, e em seu corpo (body) com um objeto com a propriedade mensagem que deverá possuir como valor um texto o motivo da falha.



#### **Exemplo de requisição**

```javascript
// GET /transacaoes
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
	"descricao": "Sapato amarelo",
	"valor": 15800,
	"data": "2022-03-23 12:35:00",
	"tipo": "saida"
 },
  {
	"descricao": "Sapato preto",
	"valor": 800,
	"data": "2023-03-21 12:35:00",
	"tipo": "entrada"
 },
];
```

```javascript
// HTTP Status 200 / 201 / 204
[];
```