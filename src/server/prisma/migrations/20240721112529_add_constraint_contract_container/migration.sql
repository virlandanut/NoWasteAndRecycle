/*
  Warnings:

  - A unique constraint covering the columns `[container]` on the table `Contract_inchiriere` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[container]` on the table `Contract_reciclare` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Contract_inchiriere_container_key` ON `Contract_inchiriere`(`container`);

-- CreateIndex
CREATE UNIQUE INDEX `Contract_reciclare_container_key` ON `Contract_reciclare`(`container`);
