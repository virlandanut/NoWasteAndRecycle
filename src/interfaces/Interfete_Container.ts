export interface ContainerInchiriere {
  id_container: number;
  denumire: string;
  capacitate: number;
  status: number;
  adresa: string;
  id_utilizator: number;
  denumire_firma: string;
  status_aprobare: number;
  descriere: string;
}

export interface PretContainer {
  denumire_tip_pret: string;
  pret: number;
}
