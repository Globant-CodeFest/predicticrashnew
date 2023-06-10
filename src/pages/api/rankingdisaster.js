/* eslint-disable import/no-anonymous-default-export */
import excuteQuery from "../../lib/db";
import * as db from "../../lib/db";

export default async (req, res) => {
    try {
        const result = await excuteQuery({
            query: "SELECT count(*) as cnt, Disastertype FROM disastre group by Disastertype order by cnt desc limit 4",
        });
        res.status(200).json(result)
    } catch ( error ) {
        console.log( error );
    }
};