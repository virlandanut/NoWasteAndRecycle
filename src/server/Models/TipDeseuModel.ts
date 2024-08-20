import { Tip_deseu } from "@prisma/client";
import prisma from "../Prisma/client.js";

export async function getTipContainerCuDenumire(
  denumire_tip: string
): Promise<Tip_deseu | null> {
  return await prisma.tip_deseu.findUnique({ where: { denumire_tip } });
}
