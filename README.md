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

```bash
mvn spring-boot:run
```
