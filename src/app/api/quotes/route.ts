import {NextRequest, NextResponse} from "next/server";
import Airtable, { FieldSet, Table } from 'airtable'
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const base = new Airtable({apiKey: process.env.API_KEY_ODB}).base('app5C3EKxBArX6f00')
const table1 = base('Visionary voices');

const getQuotes = (table1: Table<FieldSet>) => {

    return new Promise((resolve, reject) => {
        table1 && table1.select({
            view: 'Grid view',
            fields: ['author name', 'Author Headshots', 'What he did', 'Quote']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records?.map(record => ({
                    id: record.id,
                    name: record.get('author name'),
                    image: record.get('Author Headshots'),
                    desc: record.get('What he did'),
                    quote: record.get('Quote')
                }));
                resolve(data);
            }
        });
    });
}


export async function GET (request: NextRequest){
  try {
    const data = await getQuotes(table1);
    return NextResponse.json(data);
  }catch(e){
    // console.error(e);
    // const response = NextResponse.next()
    // response.cookies.set('error', `${e}`)
    // return response
    return NextResponse.json({message : "Something went wrong"})
}
}