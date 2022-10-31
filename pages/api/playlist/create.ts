import { write, readFile, open, openSync, appendFile } from "fs";
import { writeFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";


export default async function create(req: NextApiRequest, res: NextApiResponse) {
    const { files, local, name } = req.body;


    try {
        open('playlist.onpx', 'w', (err, file) => {
            if (err) res.json({ message: 'Failed to create playlist', success: false, error: err });

        });

        for (let i = 0; i < 10; i++) {
            appendFile('playlist.onpx',
                `${i}. playlist${i}\n`, ()=> {
                    console.log(`saved file ${1}`);
                }
            )
        }
        res.json({ message: 'Playlist Created', success: true });
        if (local) {
        }
    } catch (error) {

    }
}