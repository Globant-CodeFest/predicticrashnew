/* eslint-disable import/no-anonymous-default-export */
import excuteQuery from "../../lib/db";
import * as db from "../../lib/db";

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: "SELECT count(*) as cnt, Country FROM disastre WHERE  Country != '' group by Country order by cnt desc limit 3",
        });
        res.status(200).json(result)
    } catch ( error ) {
        console.log( error );
    }
};