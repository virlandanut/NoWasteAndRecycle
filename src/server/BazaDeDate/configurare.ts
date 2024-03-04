import mssql from "mssql";

const configurareBD: mssql.config = {
  user: "sa",
  password: "Katmeinlife981432",
  server: "localhost",
  port: 2333,
  database: "NoWasteAndRecycle",
  options: {
    trustServerCertificate: true,
    encrypt: true,
  },
};

export const pool = new mssql.ConnectionPool(configurareBD);
