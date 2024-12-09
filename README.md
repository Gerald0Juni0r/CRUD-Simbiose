# CRUD-Simbiose
 Criando um projeto CRUD utilizando Java Spring Boot



## Caso a porta 8080 esteja em uso

Você precisa encontrar e parar o processo que está usando a porta 8080

#### Windows:
Abra o Prompt de Comando ou PowerShell e execute o seguinte comando para encontrar o ID do processo (PID) que está usando a porta 8080:

```bash
netstat -ano | findstr :8080
```

Esse comando vai retornar uma linha com o PID do processo que está usando a porta 8080.

Para finalizar o processo, use o seguinte comando (substitua <PID> pelo número do processo encontrado):

```bash
taskkill /PID <PID> /F
```

#### Linux ou macOS:

Execute o seguinte comando para encontrar o PID:

```bash
lsof -i :8080
```

Para encerrar o processo:

```bash
kill -9 <PID>
```
    
## Iniciar Spring Boot

### 1. Navegue até o diretório do projeto:
No terminal, vá para a pasta principal do projeto, onde está o arquivo pom.xml. 

Exemplo:

```bash
cd caminho/para/o/projeto
```

### 2. Execute o comando para iniciar a aplicação:

```bash
mvn spring-boot:run
```

### 3. Confirme que a aplicação iniciou:

No terminal, você verá mensagens indicando que a aplicação está rodando.

Por padrão, ela estará disponível em: 

```link
http://localhost:8080
```

ou estará em:

```link
http://localhost:8080/pessoas
```

## Como Usar a API de Pessoas com o Postman

#### POST - Criar Nova Pessoa

1. Abra o Postman.

2. Selecione o método 'POST'.

3. Digite a URL: http://localhost:8080/pessoas.

4. Selecione a opção 'Body' e escolha o tipo 'raw' e 'JSON'.

5. No 'Body' da requisição, insira um 'JSON' com os dados da pessoa:

```json
{
    "nome": "Marcos Ferreira",
    "email": "marcosf@gmail.com",
    "dataNascimento": "07-02-1970"
}
```

6. Clique em 'Send'.

A resposta será o objeto criado, incluindo o ID gerado automaticamente.
Exemplo de resposta:

```json
{
    "id": 1,
    "nome": "Marcos Ferreira",
    "email": "marcosf@gmail.com",
    "dataNascimento": "07-02-1970"
}
```

#### GET - Listar pessoas

1. Abra o Postman.

2. Selecione o método 'GET'.

3. Digite a URL: http://localhost:8080/pessoas.

4. Clique em 'Send'.

A resposta será uma lista de todas as pessoas cadastradas no formato JSON.
Exemplo de resposta:

```json
[
    {
        "id": 1,
        "nome": "Marcos Ferreira",
        "email": "marcosf@gmail.com",
        "dataNascimento": "07-02-1970"
    },
    {
        "id": 2,
        "nome": "Paulo Silva",
        "email": "paulo.silva@gmail.com",
        "dataNascimento": "10-06-1998"
    }
]
```

#### GET - Buscar pessoa por ID

1. Abra o Postman.

2. Selecione o método 'GET'.

3. Digite a URL: http://localhost:8080/pessoas/1 (onde '1' é o ID da pessoa que você deseja buscar). 

4. Clique em 'Send'.

A resposta será uma lista de todas as pessoas cadastradas no formato JSON.
Exemplo de resposta:

```json
{
    "id": 1,
    "nome": "Santana Silva",
    "email": "ss@gmail.com",
    "dataNascimento": "02-05-1998"
}
```

#### PUT - Atualizar pessoa

1. Abra o Postman.

2. Selecione o método 'PUT'.

3. Digite a URL http://localhost:8080/pessoas/2 (onde '2' é o ID da pessoa que você deseja atualizar).

4. Selecione a opção 'Body' e escolha o tipo 'raw' e 'JSON'.

5. No 'Body' da requisição, insira um 'JSON' com os dados atualizados:

```json
{
    "nome": "Paulo Silva",
    "email": "paulo.silva@gmail.com",
    "dataNascimento": "10-06-2000"
}
```

6. Clique em 'Send'.

A resposta será o objeto atualizado. Exemplo de resposta:

```json
{
    "id": 2,
    "nome": "Paulo Silva",
    "email": "paulo.silva@gmail.com",
    "dataNascimento": "10-06-2000"
}
```

#### DELETE - Remover pessoa

1. Abra o Postman.

2. Selecione o método 'DELETE'.

3. Digite a URL http://localhost:8080/pessoas/1 (onde '1' é o ID da pessoa que você deseja remover).

4. Clique em 'Send'.

A resposta será um status 204 No Content, indicando que a pessoa foi removida com sucesso.
Exemplo de resposta:

Nenhuma resposta no corpo, apenas um status 204 No Content.
# Passos para Alterar a URL CORS no Backend

1. Abra o arquivo do controlador onde você tem a anotação `@CrossOrigin`.
   
2. Alterar a anotação `@CrossOrigin` com a nova URL de origem permitida:

```java
   @CrossOrigin(origins = "http://localhost:3000") // Altere para a URL do seu frontend
```

3. Se necessário, reinicie o backend e teste o acesso a partir da nova URL do frontend.

4. (Opcional) Configure CORS globalmente: Se você preferir uma configuração global para CORS, crie uma classe WebConfig:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000"); // URL permitida
    }
}
```

Com isso, seu backend estará configurado para permitir requisições apenas do novo domínio que você especificou.
