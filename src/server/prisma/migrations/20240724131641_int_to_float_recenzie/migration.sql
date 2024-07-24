/*
  Warnings:

  - You are about to alter the column `scor` on the `Recenzie` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Recenzie` MODIFY `scor` DOUBLE NOT NULL;
