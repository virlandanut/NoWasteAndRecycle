/*
  Warnings:

  - You are about to alter the column `pret` on the `Contract_inchiriere` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `pret` on the `Contract_reciclare` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Contract_inchiriere` MODIFY `pret` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Contract_reciclare` MODIFY `pret` DOUBLE NOT NULL;
