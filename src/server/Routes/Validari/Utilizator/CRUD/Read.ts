import mssql from "mssql";
import { pool } from "../../../../Database/configurare.js";
import { ExpressError } from "../../../../Utils/ExpressError.js";
import prisma from "../../../../prisma/client.js";
import { Firma, Persoana_fizica, Prisma, Utilizator } from "@prisma/client";

// export async function validareUsername(
//   nume_utilizator: string
// ): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("nume_utilizator", mssql.NVarChar, nume_utilizator)
//       .query(
//         "SELECT COUNT(*) FROM Utilizator WHERE nume_utilizator=@nume_utilizator"
//       );
//     return Object.values(rezultat.recordset[0])[0] as number;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la validarea numelui de utilizator",
//         500
//       );
//     }
//   }
// }

export async function validareUsername(
  nume_utilizator: string
): Promise<Utilizator | null> {
  try {
    const utilizator = await prisma.utilizator.findUnique({
      where: { nume_utilizator },
    });
    return utilizator;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Numele de utilizator nu a putut fi validat", 500);
    }
  }
}

export async function validareUsernameSchimbareDate(
  id_utilizator: number,
  nume_utilizator: string
): Promise<Utilizator | null> {
  try {
    const utilizator: Utilizator | null = await prisma.utilizator.findUnique({
      where: {
        nume_utilizator: nume_utilizator,
        NOT: {
          id_utilizator: id_utilizator,
        },
      },
    });
    return utilizator;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${error.message}`, 500);
    } else {
      throw new ExpressError("Numele de utilizator nu a putut fi validat", 500);
    }
  }
}

// export async function validareCNP(cnp: string): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("cnp", mssql.NVarChar, cnp)
//       .query("SELECT COUNT(*) FROM Persoana_fizica WHERE cnp=@cnp");
//     return Object.values(rezultat.recordset[0])[0] as number;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "CNP-ul utilizatorului nu a putut fi validat",
//         500
//       );
//     }
//   }
// }

export async function validareCNP(
  cnp: string
): Promise<Persoana_fizica | null> {
  try {
    const persoana: Persoana_fizica | null =
      await prisma.persoana_fizica.findUnique({
        where: { cnp },
      });

    return persoana;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("CNP-ul nu a putut fi validat", 500);
    }
  }
}

// export async function validareTelefon(telefon: string): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("telefon", mssql.NVarChar, telefon)
//       .query("SELECT COUNT(*) FROM Utilizator WHERE telefon=@telefon");
//     return Object.values(rezultat.recordset[0])[0] as number;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Telefonul utilizatorului nu a putut fi validat",
//         500
//       );
//     }
//   }
// }

export async function validareTelefon(
  telefon: string
): Promise<Utilizator | null> {
  try {
    const utilizator: Utilizator | null = await prisma.utilizator.findUnique({
      where: { telefon },
    });

    return utilizator;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Numele de utilizator nu a putut fi validat", 500);
    }
  }
}

export async function validareTelefonSchimbareDate(
  id_utilizator: number,
  telefon: string
): Promise<Utilizator | null> {
  try {
    const utilizator: Utilizator | null = await prisma.utilizator.findUnique({
      where: {
        telefon,
        NOT: {
          id_utilizator,
        },
      },
    });

    return utilizator;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Numărul de telefon nu a putut fi validat", 500);
    }
  }
}

// export async function validareEmail(email: string): Promise<boolean> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("email", mssql.NVarChar, email)
//       .query("SELECT COUNT(*) FROM Utilizator WHERE email=@email");
//     return Object.values(rezultat.recordset[0])[0] as number;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la validarea email-ului",
//         500
//       );
//     }
//   }
// }

export async function validareEmail(email: string): Promise<Utilizator | null> {
  try {
    const utilizator: Utilizator | null = await prisma.utilizator.findUnique({
      where: { email },
    });

    return utilizator;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Emailul nu a putut fi validat", 500);
    }
  }
}

// export async function validareEmailSchimbareDate(
//   id_utilizator: number,
//   email: string
// ): Promise<number> {
//   try {
//     const rezultat = await prisma.utilizator.count({
//       where: {
//         email: email,
//         NOT: {
//           id_utilizator: id_utilizator,
//         },
//       },
//     });
//     return rezultat;
//   } catch (error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       throw new ExpressError(`Eroare Prisma: ${error.message}`, 500);
//     } else {
//       throw new ExpressError("Numele de utilizator nu a putut fi validat", 500);
//     }
//   }
// }

export async function validareEmailSchimbareDate(
  id_utilizator: number,
  email: string
): Promise<Utilizator | null> {
  try {
    const utilizator: Utilizator | null = await prisma.utilizator.findUnique({
      where: { email, NOT: { id_utilizator } },
    });

    return utilizator;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Emailul nu a putut fi validat", 500);
    }
  }
}

// export async function validareCIF(cif: string): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("cif", mssql.NVarChar, cif)
//       .query("SELECT COUNT(*) FROM Firma WHERE cif=@cif");
//     return Object.values(rezultat.recordset[0])[0] as number;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError("Au existat probleme la validarea cif-ului", 500);
//     }
//   }
// }

export async function validareCIF(cif: string): Promise<Firma | null> {
  try {
    const firma: Firma | null = await prisma.firma.findUnique({
      where: { cif },
    });

    return firma;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      throw new ExpressError("Cif-ul nu a putut fi validat", 500);
    }
  }
}
