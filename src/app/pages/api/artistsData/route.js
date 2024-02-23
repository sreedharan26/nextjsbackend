import { NextResponse } from 'next/server';
import Airtable from 'airtable'

const base = new Airtable({apiKey: process.env.API_KEY_ODB}).base('app5C3EKxBArX6f00')
const table4 = base('Form');

const getArtistsData = (table) => {
    return new Promise((resolve, reject) => {
        table.select({
            view: 'Grid view',
            fields: ['option1' ,'option2', 'option3', 'option4']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records.map(record => ({
                    id: record.id,
                    option1: record.get('option1'),
                    option2: record.get('option2'),
                    option3: record.get('option3'),
                    option4: record.get('option4'),
                }));
                const artistData = []
                data.forEach(object => {
                    const question = []
                    question.push([object && object.option1])
                    question.push([object && object.option2])
                    question.push([object && object.option3])
                    question.push([object && object.option4])
                    artistData.push(question)
                    return 
                })
                resolve(artistData);
            }
        });
    });
}

export async function GET(req, res) {
    // try {
        const data = await getArtistsData(table4);
        return NextResponse.json(data);
    // } catch (e) {
        // console.error(e);
        // return NextResponse.error(new Error(e.message));
    // }
}