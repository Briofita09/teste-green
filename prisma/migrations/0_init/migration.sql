-- CreateTable
CREATE TABLE "boletos" (
    "id" SERIAL NOT NULL,
    "nome_sacado" VARCHAR(255),
    "id_lote" INTEGER NOT NULL,
    "valor" DECIMAL,
    "linha_digitavel" VARCHAR(255),
    "ativo" BOOLEAN,
    "criado_em" TIMESTAMP(6),

    CONSTRAINT "boletos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100),
    "ativo" BOOLEAN,
    "criado_em" TIMESTAMP(6),

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boletos" ADD CONSTRAINT "boletos_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

