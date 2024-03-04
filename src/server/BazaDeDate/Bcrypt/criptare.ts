import * as bcrypt from "bcrypt";

export async function criptareParola(parola: string): Promise<string> {
  return await bcrypt.hash(parola, 10);
}

export async function comparaParole(
  parola: string,
  parolaCriptata: string
): Promise<boolean> {
  return await bcrypt.compare(parola, parolaCriptata);
}
