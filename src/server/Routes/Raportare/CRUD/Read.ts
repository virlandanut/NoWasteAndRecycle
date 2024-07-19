import mssql from "mssql";
import { pool } from "../../../Database/configurare.js";
import {
  ComentariuTichet,
  TichetCuNume,
  TichetRaportare,
} from "../Interfete.js";
import { ExpressError } from "../../../Utils/ExpressError.js";
import { Comentariu, Prisma, Raport_problema } from "@prisma/client";
import prisma from "../../../prisma/client.js";

// export async function getTicheteRaport(
//   id_utilizator: number
// ): Promise<TichetRaportare[]> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("id_utilizator", mssql.Int, id_utilizator)
//       .query(`SELECT * FROM Raport_Problema WHERE utilizator=@id_utilizator`);
//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Tichetele nu au putut fi interogate din baza de date",
//         500
//       );
//     }
//   }
// }

export async function getTicheteRaport(
  id_utilizator: number
): Promise<Raport_problema[]> {
  try {
    const tichete = await prisma.raport_problema.findMany({
      where: { utilizator: id_utilizator },
    });

    const ticheteRaportare = tichete.map((tichet) => ({
      id_raport_problema: tichet.id_raport_problema,
      utilizator: tichet.utilizator,
      titlu: tichet.titlu,
      mesaj: tichet.mesaj,
      data_postare: tichet.data_postare,
      data_actualizare: tichet.data_actualizare,
      status: tichet.status,
    }));

    return ticheteRaportare;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Tichetele nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

// export async function getToateTichetelePersoane(): Promise<TichetCuNume[]> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = await pool.request();
//     const rezultat = await cerere.query(
//       "SELECT id_raport_problema, titlu, status, data, CONCAT(nume, ' ', prenume) AS utilizator FROM Raport_problema AS rp JOIN Persoana_fizica AS pf ON rp.utilizator=pf.id_utilizator WHERE status=0"
//     );
//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea tichetelor persoanelor din baza de date",
//         500
//       );
//     }
//   }
// }

export async function getToateTichetelePersoane(): Promise<TichetCuNume[]> {
  try {
    const tichete = await prisma.raport_problema.findMany({
      where: {
        status: false,
        Utilizator: {
          Persoana_fizica: {
            isNot: null,
          },
        },
      },
      select: {
        id_raport_problema: true,
        titlu: true,
        status: true,
        data_postare: true,
        Utilizator: {
          select: {
            Persoana_fizica: {
              select: {
                nume: true,
                prenume: true,
              },
            },
          },
        },
      },
    });

    return tichete.map((tichet) => ({
      id_raport_problema: tichet.id_raport_problema,
      titlu: tichet.titlu,
      status: tichet.status,
      data: tichet.data_postare,
      utilizator: tichet.Utilizator.Persoana_fizica
        ? `${tichet.Utilizator.Persoana_fizica?.nume} ${tichet.Utilizator.Persoana_fizica?.prenume}`
        : "Cont șters",
    }));
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Tichetele persoanelor nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

// export async function getToateTicheteleFirme(): Promise<TichetCuNume[]> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = await pool.request();
//     const rezultat = await cerere.query(
//       "SELECT id_raport_problema, titlu, status, data, denumire_firma AS utilizator FROM Raport_problema AS rp JOIN Firma AS f ON rp.utilizator=f.id_utilizator WHERE status=0"
//     );
//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea tichetelor firmelor din baza de date",
//         500
//       );
//     }
//   }
// }

export async function getToateTicheteleFirme(): Promise<TichetCuNume[]> {
  try {
    const tichete = await prisma.raport_problema.findMany({
      where: {
        status: false,
        Utilizator: {
          Firma: {
            isNot: null,
          },
        },
      },
      select: {
        id_raport_problema: true,
        titlu: true,
        status: true,
        data_postare: true,
        Utilizator: {
          select: {
            Firma: {
              select: {
                denumire_firma: true,
              },
            },
          },
        },
      },
    });

    return tichete.map((tichet) => ({
      id_raport_problema: tichet.id_raport_problema,
      titlu: tichet.titlu,
      status: tichet.status,
      data: tichet.data_postare,
      utilizator: tichet.Utilizator.Firma
        ? tichet.Utilizator.Firma.denumire_firma
        : "Cont șters",
    }));
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Tichetele firmelor nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

// export async function getTichet(
//   id_raport_problema: number
// ): Promise<TichetRaportare> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("id_raport_problema", mssql.Int, id_raport_problema)
//       .query(
//         `SELECT id_raport_problema, utilizator, titlu, mesaj, data, status FROM Raport_problema WHERE id_raport_problema=@id_raport_problema`
//       );
//     return rezultat.recordset[0];
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea tichetului de problemă din baza de date",
//         500
//       );
//     }
//   }
// }

export async function getTichet(
  id_raport_problema: number
): Promise<Raport_problema> {
  try {
    const tichet = await prisma.raport_problema.findUnique({
      where: { id_raport_problema },
    });
    if (!tichet) {
      throw new ExpressError("Tichetul nu există în baza de date", 404);
    }
    return tichet;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Tichetul nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

// export async function getProprietarTichet(
//   id_raport_problema: number
// ): Promise<number> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("id_raport_problema", mssql.Int, id_raport_problema)
//       .query(
//         "SELECT utilizator FROM Raport_problema WHERE id_raport_problema=@id_raport_problema"
//       );
//     return rezultat.recordset[0].utilizator;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "Au existat probleme la interogarea proprietarului tichetului",
//         400
//       );
//     }
//   }
// }

export async function getProprietarTichet(
  id_raport_problema: number
): Promise<number> {
  try {
    const proprietar = await prisma.raport_problema.findUnique({
      where: { id_raport_problema },
      select: { utilizator: true },
    });

    if (!proprietar) {
      throw new ExpressError("Proprietarul nu a fost găsit!", 404);
    }

    return proprietar.utilizator;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Proprietarul tichetului nu au putut fi interogat din baza de date",
        500
      );
    }
  }
}

// export async function getComentariiProprietarPersoana(
//   id_raport_problema: number,
//   id_proprietar: number
// ): Promise<ComentariuTichet[]> {
//   let conexiune;
//   try {
//     conexiune = await pool.connect();
//     const cerere = pool.request();
//     const rezultat = await cerere
//       .input("id_raport_problema", mssql.Int, id_raport_problema)
//       .input("id_proprietar", mssql.Int, id_proprietar)
//       .query(
//         `SELECT id_comentariu, CONCAT(nume, ' ', prenume) as nume, mesaj, data FROM Comentariu as c JOIN Persoana_fizica as pf ON c.utilizator = pf.id_utilizator AND tichet_problema=@id_raport_problema AND pf.id_utilizator=@id_proprietar`
//       );
//     return rezultat.recordset;
//   } catch (eroare) {
//     if (eroare instanceof mssql.MSSQLError) {
//       throw new ExpressError(`Eroare MSSQL: ${eroare.message}`, 500);
//     } else {
//       throw new ExpressError(
//         "A existat o eroare la interogarea comentariilor proprietarului tichetului din baza de date",
//         500
//       );
//     }
//   }
// }

export async function getComentariiProprietarPersoana(
  id_raport_problema: number,
  id_proprietar: number
): Promise<ComentariuTichet[]> {
  try {
    const comentarii = await prisma.comentariu.findMany({
      where: {
        raport_problema: id_raport_problema,
        utilizator: id_proprietar,
      },
      select: {
        id_comentariu: true,
        mesaj: true,
        data: true,
        Utilizator: {
          select: {
            Persoana_fizica: {
              select: {
                nume: true,
                prenume: true,
              },
            },
          },
        },
      },
    });

    const comentariiTichet: ComentariuTichet[] = comentarii.map(
      (comentariu) => ({
        id_comentariu: comentariu.id_comentariu,
        mesaj: comentariu.mesaj,
        data: comentariu.data,
        nume: comentariu.Utilizator.Persoana_fizica
          ? `${comentariu.Utilizator.Persoana_fizica.nume} ${comentariu.Utilizator.Persoana_fizica.prenume}`
          : "Cont șters",
        rol: "proprietar",
      })
    );

    return comentariiTichet;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Comentariile proprietarului nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

export async function getComentariiProprietarFirma(
  id_raport_problema: number,
  id_proprietar: number
): Promise<ComentariuTichet[]> {
  try {
    const comentarii = await prisma.comentariu.findMany({
      where: {
        raport_problema: id_raport_problema,
        utilizator: id_proprietar,
      },
      select: {
        id_comentariu: true,
        mesaj: true,
        data: true,
        Utilizator: {
          select: {
            Firma: {
              select: {
                denumire_firma: true,
              },
            },
          },
        },
      },
    });
    const comentariiTichet: ComentariuTichet[] = comentarii.map(
      (comentariu) => ({
        id_comentariu: comentariu.id_comentariu,
        mesaj: comentariu.mesaj,
        data: comentariu.data,
        nume: comentariu.Utilizator.Firma
          ? `${comentariu.Utilizator.Firma.denumire_firma}`
          : "Cont șters",
        rol: "proprietar",
      })
    );

    return comentariiTichet;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Comentariile proprietarului nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}

export async function getComentariiAdministrator(
  id_raport_problema: number
): Promise<ComentariuTichet[]> {
  try {
    const comentarii = await prisma.comentariu.findMany({
      where: {
        raport_problema: id_raport_problema,
        Utilizator: {
          rol: "ADMINISTRATOR",
        },
      },
      select: {
        id_comentariu: true,
        mesaj: true,
        data: true,
        Utilizator: {
          select: {
            rol: true,
            Persoana_fizica: {
              select: {
                nume: true,
                prenume: true,
              },
            },
          },
        },
      },
    });
    const comentariiTichet: ComentariuTichet[] = comentarii.map(
      (comentariu) => ({
        id_comentariu: comentariu.id_comentariu,
        nume: comentariu.Utilizator.Persoana_fizica
          ? `${comentariu.Utilizator.Persoana_fizica.nume} ${comentariu.Utilizator.Persoana_fizica.prenume}`
          : "Cont șters",
        mesaj: comentariu.mesaj,
        data: comentariu.data,
        rol: comentariu.Utilizator.rol,
      })
    );

    return comentariiTichet;
  } catch (eroare) {
    if (eroare instanceof Prisma.PrismaClientKnownRequestError) {
      throw new ExpressError(`Eroare Prisma: ${eroare.message}`, 500);
    } else {
      console.error(`Eroare necunoscută: ${eroare}`);
      throw new ExpressError(
        "Comentariile administratorului nu au putut fi interogate din baza de date",
        500
      );
    }
  }
}
