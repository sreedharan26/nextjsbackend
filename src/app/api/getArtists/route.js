import { NextResponse } from 'next/server';
import Airtable from 'airtable'

const base = new Airtable({apiKey: process.env.API_KEY_ODB}).base('app5C3EKxBArX6f00')
const table1 = base('Visionary voices');

const getArtists = (table1) => {
    return new Promise((resolve, reject) => {
        table1.select({
            view: 'Grid view',
            fields: ['author name', 'Author Headshots', 'What he did', 'Daily Schedule']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                let data = records.map(record => ({
                    id: record.id,
                    name: record.get('author name'),
                    image: record.get('Author Headshots'),
                    desc: record.get('What he did'),
                    schedule: record.get('Daily Schedule')
                }));
                // data = data.filter(obj => (obj.schedule!==null && obj.schedule!=='\n' && obj.schedule.length > 2))
                resolve(data);
            }
        });
    });
}

export async function GET(req, res) {
    try {
        const data = await getArtists(table1);
        return NextResponse.json(data);
    } catch (e) {
        console.error(e);
        return NextResponse.error(new Error(e.message));
    }
}