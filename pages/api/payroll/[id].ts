import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../connectDb';
import Payroll from '@/model/Payroll';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();

    const {
      query: { id },
      method,
    } = req;

    console.log('API called:', method, id); // Debug log

    switch (method) {
      case 'GET':
        try {
          console.log('Fetching payroll with id:', id);
          const payroll = await Payroll.findOne({ id: id });
          
          console.log('Found payroll:', payroll ? 'Yes' : 'No');
          
          if (!payroll) {
            return res.status(404).json({ 
              success: false, 
              error: 'Payroll not found',
              searchedId: id 
            });
          }
          
          return res.status(200).json({ success: true, data: payroll });
        } catch (error: any) {
          console.error('GET Error:', error);
          return res.status(500).json({ 
            success: false, 
            error: error.message,
            stack: error.stack 
          });
        }

      case 'PUT':
        try {
          const payroll = await Payroll.findOneAndUpdate(
            { id: id },
            req.body,
            { new: true, runValidators: true }
          );
          
          if (!payroll) {
            return res.status(404).json({ success: false, error: 'Payroll not found' });
          }
          
          return res.status(200).json({ success: true, data: payroll });
        } catch (error: any) {
          console.error('PUT Error:', error);
          return res.status(400).json({ success: false, error: error.message });
        }

      case 'DELETE':
        try {
          const payroll = await Payroll.findOneAndDelete({ id: id });
          
          if (!payroll) {
            return res.status(404).json({ success: false, error: 'Payroll not found' });
          }
          
          return res.status(200).json({ success: true, data: {} });
        } catch (error: any) {
          console.error('DELETE Error:', error);
          return res.status(500).json({ success: false, error: error.message });
        }

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Handler Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    });
  }
}