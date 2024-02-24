import {NextRequest, NextResponse} from "next/server";
import Airtable, { FieldSet, Table } from 'airtable'
import axios, {AxiosResponse} from 'axios'
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const AIRTABLE_ENDPOINT = "https://api.airtable.com/v0/app5C3EKxBArX6f00/tblbpaR1OB84NkwIv"
const API_KEY = process.env.API_KEY_ODB

const headers = {
    Authorization: `Bearer ${API_KEY}`,
}

const fieldsToRetrieve = ['Name', 'image'];

const fetchPrompts = async () => {
    try{
        const response: AxiosResponse = await axios.get(AIRTABLE_ENDPOINT, { headers, params: {fields : fieldsToRetrieve}});
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
      const data = await fetchPrompts()
      return NextResponse.json(data);
    }catch(e){
      // console.error(e);
      // const response = NextResponse.next()
      // response.cookies.set('error', `${e}`)
      // return response
      return NextResponse.json({message : `${e}`, status: 500})
  }
  }