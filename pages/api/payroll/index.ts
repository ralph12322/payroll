import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../connectDb';
import Payroll from '@/model/Payroll';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { status } = req.query;
        let query = {};
        if (status) query = { status };
        
        const payrolls = await Payroll.find(query).sort({ 'audit.createdAt': -1 });
        
        return res.status(200).json({ success: true, data: payrolls });
      } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
      }

    case 'POST':
      try {
        const payroll = await Payroll.create(req.body);
        return res.status(201).json({ success: true, data: payroll });
      } catch (error: any) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}