-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "id_categoria" TEXT NOT NULL,

    CONSTRAINT "item_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categoria_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_id_key" ON "item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "item_nome_key" ON "item"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_id_key" ON "categoria"("id");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_key" ON "categoria"("nome");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
