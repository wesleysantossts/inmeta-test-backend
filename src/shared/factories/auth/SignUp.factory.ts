import { Request, Response } from 'express';

export function SignUpFactory(req: Request, res: Response) {
  console.log('teste')
  res.status(200).json({
    result: true
  });
}