import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  deletedCookies: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, cookies, body } = req;
  const { cookieNames } = JSON.parse(body)

  if (method === 'POST') {
    const cookieStringsToDelete = cookieNames.map((cookieName: string) => {
      if (cookies[cookieName]) {
        return `${cookieName}=${cookies[cookieName]}; Max-Age=0; Path=/`;
      }
      return null;
    }).filter(Boolean);

    if (cookieStringsToDelete.length) {
      res.setHeader('Set-Cookie', cookieStringsToDelete);
    }

    res.status(200).json({ deletedCookies: true });
    return;
  }

  res.status(404).end();
}
