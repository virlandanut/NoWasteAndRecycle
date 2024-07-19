-- CreateTable
CREATE TABLE `Caen` (
    `id_caen` INTEGER NOT NULL AUTO_INCREMENT,
    `cod_caen` INTEGER NOT NULL,
    `descriere` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Caen_cod_caen_key`(`cod_caen`),
    PRIMARY KEY (`id_caen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
