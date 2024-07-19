import "express-session";

declare module "express-session" {
  interface SessionData {
    utilizator: Utilizator | null;
  }
}
