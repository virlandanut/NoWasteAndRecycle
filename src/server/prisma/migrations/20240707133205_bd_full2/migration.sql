/*
  Warnings:

  - Added the required column `mesaj` to the `Comentariu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comentariu` ADD COLUMN `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `mesaj` VARCHAR(191) NOT NULL;
