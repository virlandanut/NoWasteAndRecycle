-- CreateTable
CREATE TABLE `Comentariu` (
    `id_comentariu` INTEGER NOT NULL AUTO_INCREMENT,
    `raport_problema` INTEGER NOT NULL,
    `utilizator` INTEGER NOT NULL,

    PRIMARY KEY (`id_comentariu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Container` (
    `id_container` INTEGER NOT NULL AUTO_INCREMENT,
    `firma` INTEGER NOT NULL,
    `denumire` VARCHAR(191) NOT NULL,
    `capacitate` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `lat` DOUBLE NOT NULL,
    `long` DOUBLE NOT NULL,
    `poza` VARCHAR(191) NULL,
    `descriere` VARCHAR(191) NOT NULL,
    `strada` VARCHAR(191) NOT NULL,
    `numar` VARCHAR(191) NOT NULL,
    `localitate` INTEGER NOT NULL,
    `data_adaugare` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_container`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Container_inchiriere_depozitare` (
    `id_container_depozitare` INTEGER NOT NULL AUTO_INCREMENT,
    `utilizator` INTEGER NOT NULL,
    `container` INTEGER NOT NULL,
    `data_inceput` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_sfarsit` DATETIME(3) NULL,
    `lat` DOUBLE NOT NULL,
    `long` DOUBLE NOT NULL,

    PRIMARY KEY (`id_container_depozitare`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Container_inchiriere_reciclare` (
    `id_container_reciclare` INTEGER NOT NULL AUTO_INCREMENT,
    `firma` INTEGER NOT NULL,
    `container` INTEGER NOT NULL,
    `data_inceput` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_sfarsit` DATETIME(3) NULL,
    `lat` DOUBLE NOT NULL,
    `long` DOUBLE NOT NULL,

    PRIMARY KEY (`id_container_reciclare`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contract_inchiriere` (
    `id_contract` INTEGER NOT NULL AUTO_INCREMENT,
    `container` INTEGER NOT NULL,
    `numar_contract` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pret` INTEGER NOT NULL,

    PRIMARY KEY (`id_contract`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contract_reciclare` (
    `id_contract` INTEGER NOT NULL AUTO_INCREMENT,
    `container` INTEGER NOT NULL,
    `numar_contract` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pret` INTEGER NOT NULL,

    PRIMARY KEY (`id_contract`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deseu` (
    `id_deseu` INTEGER NOT NULL AUTO_INCREMENT,
    `tip` INTEGER NOT NULL,
    `denumire_deseu` VARCHAR(191) NOT NULL,
    `grad_poluare` INTEGER NOT NULL,

    PRIMARY KEY (`id_deseu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Istoric_pret` (
    `id_istoric_pret` INTEGER NOT NULL AUTO_INCREMENT,
    `tip_pret` INTEGER NOT NULL,
    `container` INTEGER NOT NULL,
    `data_inceput` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_sfarsit` DATETIME(3) NULL,

    PRIMARY KEY (`id_istoric_pret`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Raport_problema` (
    `id_raport_problema` INTEGER NOT NULL AUTO_INCREMENT,
    `utilizator` INTEGER NOT NULL,
    `titlu` VARCHAR(191) NOT NULL,
    `mesaj` VARCHAR(191) NOT NULL,
    `data_postare` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_actualizare` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_raport_problema`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recenzie` (
    `id_recenzie` INTEGER NOT NULL AUTO_INCREMENT,
    `container` INTEGER NOT NULL,
    `scor` INTEGER NOT NULL,
    `mesaj` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_recenzie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tip_container` (
    `id_tip_container` INTEGER NOT NULL AUTO_INCREMENT,
    `container` INTEGER NOT NULL,
    `tip_deseu` INTEGER NOT NULL,

    PRIMARY KEY (`id_tip_container`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tip_deseu` (
    `id_tip` INTEGER NOT NULL AUTO_INCREMENT,
    `denumire_tip` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tip_deseu_denumire_tip_key`(`denumire_tip`),
    PRIMARY KEY (`id_tip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tip_pret` (
    `id_tip_pret` INTEGER NOT NULL AUTO_INCREMENT,
    `denumire_tip_pret` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tip_pret_denumire_tip_pret_key`(`denumire_tip_pret`),
    PRIMARY KEY (`id_tip_pret`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comentariu` ADD CONSTRAINT `Comentariu_raport_problema_fkey` FOREIGN KEY (`raport_problema`) REFERENCES `Raport_problema`(`id_raport_problema`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentariu` ADD CONSTRAINT `Comentariu_utilizator_fkey` FOREIGN KEY (`utilizator`) REFERENCES `Utilizator`(`id_utilizator`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Container` ADD CONSTRAINT `Container_firma_fkey` FOREIGN KEY (`firma`) REFERENCES `Firma`(`id_utilizator`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Container` ADD CONSTRAINT `Container_localitate_fkey` FOREIGN KEY (`localitate`) REFERENCES `Localitate`(`id_localitate`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Container_inchiriere_depozitare` ADD CONSTRAINT `Container_inchiriere_depozitare_utilizator_fkey` FOREIGN KEY (`utilizator`) REFERENCES `Utilizator`(`id_utilizator`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Container_inchiriere_depozitare` ADD CONSTRAINT `Container_inchiriere_depozitare_container_fkey` FOREIGN KEY (`container`) REFERENCES `Container`(`id_container`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Container_inchiriere_reciclare` ADD CONSTRAINT `Container_inchiriere_reciclare_firma_fkey` FOREIGN KEY (`firma`) REFERENCES `Firma`(`id_utilizator`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Container_inchiriere_reciclare` ADD CONSTRAINT `Container_inchiriere_reciclare_container_fkey` FOREIGN KEY (`container`) REFERENCES `Container`(`id_container`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract_inchiriere` ADD CONSTRAINT `Contract_inchiriere_container_fkey` FOREIGN KEY (`container`) REFERENCES `Container_inchiriere_depozitare`(`id_container_depozitare`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract_reciclare` ADD CONSTRAINT `Contract_reciclare_container_fkey` FOREIGN KEY (`container`) REFERENCES `Container_inchiriere_reciclare`(`id_container_reciclare`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deseu` ADD CONSTRAINT `Deseu_tip_fkey` FOREIGN KEY (`tip`) REFERENCES `Tip_deseu`(`id_tip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Istoric_pret` ADD CONSTRAINT `Istoric_pret_tip_pret_fkey` FOREIGN KEY (`tip_pret`) REFERENCES `Tip_pret`(`id_tip_pret`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Istoric_pret` ADD CONSTRAINT `Istoric_pret_container_fkey` FOREIGN KEY (`container`) REFERENCES `Container`(`id_container`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Raport_problema` ADD CONSTRAINT `Raport_problema_utilizator_fkey` FOREIGN KEY (`utilizator`) REFERENCES `Utilizator`(`id_utilizator`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recenzie` ADD CONSTRAINT `Recenzie_container_fkey` FOREIGN KEY (`container`) REFERENCES `Container_inchiriere_depozitare`(`id_container_depozitare`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tip_container` ADD CONSTRAINT `Tip_container_container_fkey` FOREIGN KEY (`container`) REFERENCES `Container`(`id_container`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tip_container` ADD CONSTRAINT `Tip_container_tip_deseu_fkey` FOREIGN KEY (`tip_deseu`) REFERENCES `Tip_deseu`(`id_tip`) ON DELETE RESTRICT ON UPDATE CASCADE;
