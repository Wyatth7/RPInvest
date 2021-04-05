declare namespace Express {
  export interface Request {
    authtoken: string;
    email: string;
  }
}
