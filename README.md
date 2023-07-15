# teste-green

## 📋 Sobre o projeto

O projeto é uma API que auxilia a migração de boletos entre diferentes sistemas.

## 🏁 Usando

Clone o projeto e entre na pasta clonada

```bash
$ git clone https://github.com/Briofita09/teste-green.git
$ cd teste-green
```

Instale as dependencias

```bash
$ npm i
```

Crie um arquivo .env com base no `.env.example`.
A seguir, rode os seguintes comandos para configurar o prisma e o banco de dados

```bash
$ npx prisma generate
$ npx prisma migrate dev
```

E por fim, rode o seguinte comando

```bash
$ npm run dev
```

## 💻 Documentação

```
ROTA /:

Método: POST
Content-Disposition: form-data; name="file"; filename="boletos.csv"
Content-Type: text/csv

RETORNOS ESPERADOS:

200 -> Sucesso
406 -> .csv não encontrado ou arquivo não contendo as informações corretas
```

## 🧠 Desenvolvedor

[Felipe Osório dos Santos](https://www.linkedin.com/in/felipe-osorio/)
