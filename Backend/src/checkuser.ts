import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request to include userId
interface AuthRequest extends Request {
  userId?: string;
}

export const checkuserlogin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['token'];
    console.log(authHeader)
    //@ts-ignore
    const decoded = jwt.verify(authHeader as string, process.env.JWT_PASSWORD) as JwtPayload;

    req.userId = decoded.id;
    next();
  } catch (e: any) {
    res.status(403).json({
      message: "Unauthorized"
    });
  }
};

