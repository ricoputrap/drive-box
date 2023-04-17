// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateToken } from '@/backend/login/auth';
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;

        // validate email & password availability
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "Please provide an email and password",
          });
        }

        // authenticate user
        const user = { id: 1, name: "John Doe" };

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
        }

        // validate password
        const isPasswordValid = password === "password";
        if (!isPasswordValid) {
          return res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
        }

        // generate JWT token
        const token = generateToken(user);

        return res.status(200).json({ token });
      }
      catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;