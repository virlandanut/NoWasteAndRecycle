export interface Firma {
  id_utilizator: number;
  cif: string;
  denumire_firma: string;
  data_inscriere: Date;
  email: string;
  status_aprobare: number;
}

export interface CardFirmaProps {
  firma: Firma;
}
