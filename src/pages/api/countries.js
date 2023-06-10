/* eslint-disable import/no-anonymous-default-export */
import excuteQuery from "../../lib/db";
import * as db from "../../lib/db";

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: 'SELECT Country FROM disastre group by Country order by Country desc limit 100',
        });
        res.status(200).json(result)
    } catch ( error ) {
        console.log( error );
    }
};