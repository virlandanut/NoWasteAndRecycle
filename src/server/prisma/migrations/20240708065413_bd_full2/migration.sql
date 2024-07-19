/*
  Warnings:

  - Added the required column `pret` to the `Istoric_pret` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Istoric_pret` ADD COLUMN `pret` INTEGER NOT NULL;
