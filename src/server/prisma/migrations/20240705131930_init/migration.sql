-- CreateTable
CREATE TABLE `Firma` (
    `id_utilizator` INTEGER NOT NULL,
    `cif` VARCHAR(191) NOT NULL,
    `denumire_firma` VARCHAR(191) NOT NULL,
    `caen` INTEGER NOT NULL,
    `status_aprobare` BOOLEAN NOT NULL DEFAULT false,
    `data_aprobare` DATETIME(3) NULL,

    UNIQUE INDEX `Firma_id_utilizator_key`(`id_utilizator`),
    UNIQUE INDEX `Firma_cif_key`(`cif`),
    UNIQUE INDEX `Firma_denumire_firma_key`(`denumire_firma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Localitate` (
    `id_localitate` INTEGER NOT NULL AUTO_INCREMENT,
    `denumire_localitate` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Localitate_denumire_localitate_key`(`denumire_localitate`),
    PRIMARY KEY (`id_localitate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persoana_fizica` (
    `id_utilizator` INTEGER NOT NULL,
    `cnp` VARCHAR(191) NOT NULL,
    `nume` VARCHAR(191) NOT NULL,
    `prenume` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Persoana_fizica_id_utilizator_key`(`id_utilizator`),
    UNIQUE INDEX `Persoana_fizica_cnp_key`(`cnp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilizator` (
    `id_utilizator` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nume_utilizator` VARCHAR(191) NOT NULL,
    `parola` VARCHAR(191) NOT NULL,
    `data_inscriere` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_actualizare` DATETIME(3) NOT NULL,
    `telefon` VARCHAR(191) NOT NULL,
    `strada` VARCHAR(191) NOT NULL,
    `numar` VARCHAR(191) NOT NULL,
    `poza` VARCHAR(191) NULL,
    `localitate` INTEGER NOT NULL,
    `rol` ENUM('STANDARD', 'ADMINISTRATOR', 'FIRMA') NOT NULL DEFAULT 'STANDARD',

    UNIQUE INDEX `Utilizator_email_key`(`email`),
    UNIQUE INDEX `Utilizator_nume_utilizator_key`(`nume_utilizator`),
    UNIQUE INDEX `Utilizator_telefon_key`(`telefon`),
    INDEX `Utilizator_email_idx`(`email`),
    INDEX `Utilizator_telefon_idx`(`telefon`),
    INDEX `Utilizator_nume_utilizator_idx`(`nume_utilizator`),
    PRIMARY KEY (`id_utilizator`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Firma` ADD CONSTRAINT `Firma_id_utilizator_fkey` FOREIGN KEY (`id_utilizator`) REFERENCES `Utilizator`(`id_utilizator`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Persoana_fizica` ADD CONSTRAINT `Persoana_fizica_id_utilizator_fkey` FOREIGN KEY (`id_utilizator`) REFERENCES `Utilizator`(`id_utilizator`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Utilizator` ADD CONSTRAINT `Utilizator_localitate_fkey` FOREIGN KEY (`localitate`) REFERENCES `Localitate`(`id_localitate`) ON DELETE RESTRICT ON UPDATE CASCADE;
