<p align="center">
  <img title="Redash" src='./.readme/logo.png' width="200px"/>
</p>

# Configuração do Projeto

### 1. Clonar o repositório
- Clonar o repositório
```
git clone https://github.com/arquitetodev/poupig
```

- Instalar as dependências via terminal (dentro da pasta principal)
```
npm i
```

### 2. Criar projeto no firebase

[Console Firebase](https://console.firebase.google.com/u/0/)

### 3 Criar uma Aplicação Web

- Entrar em Projeto Overview / Project Settings

![Projeto Web 1](./.readme/criar-projeto-web-1.png)

- Informe o nome do projeto.

![Projeto Web 2](./.readme/criar-projeto-web-2.png)

- Copiar informações para o arquivo .env

![Projeto Web 3](./.readme/criar-projeto-web-3.png)

Dentro do projeto frontend, renomear o arquivo ``.env.sample`` para ``.env.local``
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

### 4. Criar banco de dados

- Entrar no menu build e selecionar Firestore Database

![Menu Build](./.readme/menu-build.png)

- Selecionar o botão ``Create database``
![Firestore 1](./.readme/firestore-1.png)

- Selecione a ``Location`` e ``next``
![Firestore 2](./.readme/firestore-2.png)

- Vamos manter em ``production mode`` e selecionar o boão ``Enable``
![Firestore 3](./.readme/firestore-3.png)

### 5. Configurar banco de dados

- Editar as ``rules`` (regras de acesso) do Firestore

![Firestore 4](./.readme/firestore-4.png)

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    
    match /usuarios/{email} {
    	allow read: if request.auth != null && request.auth.token.email == email;
      allow write: if request.auth != null && request.auth.token.email == email;
    }
    
    match /financas/{email} {
      match /transacoes/{id} {
    		allow read: if request.auth != null && request.auth.token.email == email;
      	allow write: if request.auth != null && request.auth.token.email == email;
    	}
      
      match /recorrencias/{id} {
    		allow read: if request.auth != null && request.auth.token.email == email;
      	allow write: if request.auth != null && request.auth.token.email == email;
    	}
      
      match /sumarios/{id} {
    		allow read: if request.auth != null && request.auth.token.email == email;
      	allow write: if request.auth != null && request.auth.token.email == email;
    	}
    }
    
    match /contas/{email} {      
      match /itens/{id} {
    		allow read: if request.auth != null && request.auth.token.email == email;
      	allow write: if request.auth != null && request.auth.token.email == email;
    	}
    }
    
    match /cartoes/{email} {      
      match /itens/{id} {
    		allow read: if request.auth != null && request.auth.token.email == email;
      	allow write: if request.auth != null && request.auth.token.email == email;
        
        match /faturas/{id} {
    			allow read: if request.auth != null && request.auth.token.email == email;
      		allow write: if request.auth != null && request.auth.token.email == email;
    		}
    	}
    }
    
    match /categorias/{email} {
      match /itens/{id} {
    		allow read: if request.auth != null && request.auth.token.email == email;
      	allow write: if request.auth != null && request.auth.token.email == email;
    	}
    }
    
    match /eventos/{id} {      
    	allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /extratos/{email} {      
      match /mensais/{id} {
    		allow read: if request.auth != null && request.auth.token.email == email;
      	allow write: if request.auth != null && request.auth.token.email == email;
        
        match /transacoes/{id} {
    			allow read: if request.auth != null && request.auth.token.email == email;
      		allow write: if request.auth != null && request.auth.token.email == email;
    		}
    	}
      
      match /recorrencias/{id} {
    		allow read: if request.auth != null && request.auth.token.email == email;
      	allow write: if request.auth != null && request.auth.token.email == email;
    	}
    }
  }
}
```

### 6. Configurar autenticação

- Configurar autenticação com ``Google``

![Autenticação 1](./.readme/autenticacao-1.png)

![Autenticação 2](./.readme/autenticacao-2.png)

![Autenticação 3](./.readme/autenticacao-3.png)

- (Opcional) Depois pode repetir os processos para ``Facebook`` e ``Yahoo``

![Autenticação 4](./.readme/autenticacao-4.png)

### 7. Configurar cloud function

- Entrar no Menu ``Build`` > ``Functions``

- Vai precisar habilitar a parte de faturamento, mas **NÃO** será cobrado nada de início. A cobrança é pelo uso e tem uma boa camada gratuita.

![Functions 1](./.readme/functions-1.png)

- Eu usei uma conta já configurada, mas se não tiver vai precisar criar uma nova conta de faturamento

![Functions 2](./.readme/functions-2.png)

- Colocar um valor para ser notificado quando chegar nesse valor, mas isso só vai ocorrer de a aplicação tiver muito uso

![Functions 3](./.readme/functions-3.png)

- Finalizar a conversão para o plano ``Blazer``

![Functions 4](./.readme/functions-4.png)

- Agora é clicar em ``Get started``

![Functions 5](./.readme/functions-5.png)

- Continue

![Functions 6](./.readme/functions-6.png)

- Finalizar

![Functions 7](./.readme/functions-7.png)

### 8. Configurar Firebase CLI

- Instalar via terminal o CLI do firebase
```
npm i -g firebase-tools
```

- Executar o login via CLI do firebase
```
firebase login
```

- Depois de executar o login é solicitado via browser para selecionar a conta

![Login 1](./.readme/firebase-login-1.png)

- Permitir o CLI ter acesso a sua conta no firebase

![Login 2](./.readme/firebase-login-2.png)

- Mensagem de sucesso

![Login 3](./.readme/firebase-login-3.png)

- Executar o comando no terminal para listar os projetos

```
firebase projects:list
```

- No terminal entre na pasta ``apps/backend``
```
# dentro da pasta do projeto
cd apps/backend
```

- Selecione o projeto usando o seu número

```
firebase use <numero-do-projeto>
```

### 9. Configurar PUB/SUB

[Entrar Console do Google Cloud](https://console.cloud.google.com/cloudpubsub/topic/list)

- Selecione o projeto correto e vamos criar um ``topic``

![PubSub 1](./.readme/pub-sub-1.png)

- Criar um ``topic`` com nome de ``extrato-alterado``

![PubSub 2](./.readme/pub-sub-2.png)

### 10. Deploy do Backend

- Dentro da pasta do projeto ``backend`` executar o seguinte comando no terminal

```
npm run deploy
```

### 11. Executar Frontend
- Dentro da pasta principal do projeto

```
npm run dev
```