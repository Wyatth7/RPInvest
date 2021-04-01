import { Response } from "express";

const sendRes = (res: Response, code: number, message: string) => {
  return res.status(code).json({ message: message });
};

export default sendRes;
