/*
  Warnings:

  - A unique constraint covering the columns `[container]` on the table `Recenzie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Recenzie_container_key` ON `Recenzie`(`container`);
