-- AlterTable
ALTER TABLE `Container_inchiriere_depozitare` ADD COLUMN `tip` ENUM('FIX', 'MOBIL') NOT NULL DEFAULT 'FIX';
