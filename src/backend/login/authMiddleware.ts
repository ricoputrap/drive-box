import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "secret";

const authMiddleware = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) throw new Error("No token provided");

    const decodedToken = jwt.verify(token, JWT_SECRET);
    return handler(req, res);
  }
  catch (error: any) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
}

export default authMiddleware;