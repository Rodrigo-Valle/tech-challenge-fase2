/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "pedido" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT,
    "valor_total" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "status_pagamento" TEXT NOT NULL,
    "status_pedido" TEXT NOT NULL,

    CONSTRAINT "pedido_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_pedido" (
    "id" TEXT NOT NULL,
    "pedido_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_total" TEXT NOT NULL,

    CONSTRAINT "item_pedido_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pedido_id_key" ON "pedido"("id");

-- CreateIndex
CREATE UNIQUE INDEX "item_pedido_id_key" ON "item_pedido"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
