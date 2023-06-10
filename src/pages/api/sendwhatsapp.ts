// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const twilio = require("twilio");

type Data = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    const { body } = req
    const { to, message }: { to: string; message: string } = JSON.parse(body)
    const twilioNumber = process.env.TWILIO_NUMBER
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_TOKEN
    const client = new twilio(accountSid, authToken)
    
   

    client.messages
    .create({
      from: `whatsapp:${twilioNumber}`,
      body: message,
      to: `whatsapp:${to}`,
    })
    .then((twiliores: any) => {
      res.json({ data: twiliores.sid})
    })
    .catch((err: any) => console.error(err));

}

