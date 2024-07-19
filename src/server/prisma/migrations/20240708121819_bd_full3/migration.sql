/*
  Warnings:

  - A unique constraint covering the columns `[denumire]` on the table `Container` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Container_denumire_key` ON `Container`(`denumire`);
