import {NextRequest, NextResponse} from "next/server";
import Airtable, { FieldSet, Table } from 'airtable'
import axios, {AxiosResponse} from 'axios'
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const base = new Airtable({apiKey: process.env.API_KEY_ODB}).base('app5C3EKxBArX6f00')
const table1 = base('Visionary voices');

const AIRTABLE_ENDPOINT = "https://api.airtable.com/v0/app5C3EKxBArX6f00/tblUBpl7PrNu5cvYk"
const API_KEY = process.env.API_KEY_ODB

const headers = {
    Authorization: `Bearer ${API_KEY}`,
}

const fieldsToRetrieve = ['author name', 'Author Headshots', 'What he did', 'Daily Schedule'];

const fetchQuotes = async () => {
    try{
        const response: AxiosResponse = await axios.get(AIRTABLE_ENDPOINT, { headers, params: {fields : fieldsToRetrieve} });
        const data = response.data;
        // console.log(data)
        return data.records
    }catch(err){
        console.log(err)
    }
}


export async function GET (request: NextRequest){
    try {
        // const data = await getQuotes(table1);
        const data = await fetchQuotes()
        return NextResponse.json(data);
    }catch(e){
        // console.error(e);
        // const response = NextResponse.next()
        // response.cookies.set('error', `${e}`)
        // return response
        return NextResponse.json({message : `${e}`, status: 500})
    }
}




// const getQuotes = (table1: Table<FieldSet>) => {

//     return new Promise((resolve, reject) => {
//         table1 && table1.select({
//             view: 'Grid view',
//             fields: ['author name', 'Author Headshots', 'What he did', 'Quote']
//         }).firstPage((err, records) => {
//             if (err) {
//                 console.error(err);
//                 reject(err);
//             } else {
//                 const data = records?.map(record => ({
//                     id: record.id,
//                     name: record.get('author name'),
//                     image: record.get('Author Headshots'),
//                     desc: record.get('What he did'),
//                     quote: record.get('Quote')
//                 }));
//                 resolve(data);
//             }
//         });
//     });
// }



