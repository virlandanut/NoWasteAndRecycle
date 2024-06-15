import bcrypt from "bcrypt";

export async function comparaParole(
  parola: string,
  parolaCriptata: string
): Promise<boolean> {
  return await bcrypt.compare(parola, parolaCriptata);
}
