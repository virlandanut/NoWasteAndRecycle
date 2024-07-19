export interface Firma {
  id_utilizator?: number;
  cif: string;
  denumire_firma: string;
  caen: number;
  status_aprobare?: number;
  data_aprobare?: Date;
}

export interface MetriciFirma {
  id_utilizator: number;
  cif: string;
  denumire_firma: string;
  data_inscriere: Date;
  email: string;
  status_aprobare: boolean;
}

export interface DateInregistrariFirme {
  numarFirme: number;
  data_inscriere: Date;
}

export interface DateExistenteFirma {
  denumire_firma: string;
  email: string;
  nume_utilizator: string;
  telefon: string;
  strada: string;
  numar: string;
  localitate: string;
}
