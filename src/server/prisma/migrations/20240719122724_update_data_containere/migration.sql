/*
  Warnings:

  - Made the column `data_sfarsit` on table `Container_inchiriere_depozitare` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_sfarsit` on table `Container_inchiriere_reciclare` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Container_inchiriere_depozitare` ALTER COLUMN `data_inceput` DROP DEFAULT,
    MODIFY `data_sfarsit` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Container_inchiriere_reciclare` ALTER COLUMN `data_inceput` DROP DEFAULT,
    MODIFY `data_sfarsit` DATETIME(3) NOT NULL;
