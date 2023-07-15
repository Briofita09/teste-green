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

[Arquivo de exemplo para o body](boletos.csv)

```
ROTA /:

Método: POST
Content-Disposition: form-data; name="file"; filename="boletos.csv"
Content-Type: text/csv

RETORNOS ESPERADOS:

200 -> Sucesso
406 -> .csv não encontrado ou arquivo não contendo as informações corretas
500 -> Erro ao salvar algum boleto no banco de dados
```

```
ROTA /generate-pdf:

Método: GET

RETORNOS ESPERADOS:

200 -> Sucesso
500 -> Erro ao gerar o pdf
```

[Arquivo de exemplo para o body](Boletos.pdf)

```
ROTA /generate-boleto:

Método: POST
Content-Disposition: form-data; name="file"; filename="Boletos.pdf"
Content-Type: application/pdf

RETORNOS ESPERADOS:

200 -> Sucesso
406 -> Formato de arquivo inesperado
500 -> Erro ao gerar o pdf
```

```
ROTA /generate-boleto:

Método: GET

RETORNOS ESPERADOS:

200 -> Sucesso -> retorna uma string base64

FILTROS ACEITOS:
- nome=JOSE&valor_inicial=100&valor_final=200&id_lote=2
- relatorio=1
```

## 🧠 Desenvolvedor

[Felipe Osório dos Santos](https://www.linkedin.com/in/felipe-osorio/)
