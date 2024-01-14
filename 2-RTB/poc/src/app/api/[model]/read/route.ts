import {ChromaClient, IncludeEnum} from "chromadb";
import {collections} from "@/utils/chat_utils";
import {NextRequest, NextResponse} from "next/server";

interface RisultatoQuery{
    name: string;
    path: string;
    date: string;
    size : number;
}

interface Metadata {
    name: string;
    source: string;
    date: string;
    size: number;
    page: number; // Assuming there's a 'page' property in the Metadata interface
}


export async function GET(req: NextRequest, { params }: { params: { model: string } }) {                                       //chiamato per prendere dal database le info sui documenti
    const model = params.model;
    let result :  RisultatoQuery[] = [];

    try {
        const client = new ChromaClient()
        let collection
        collection = await client.getCollection({name: collections[model]})
        /*
        // se non esite e no la creo, dà errore. Sotto, il codice che ho usato per far partire il tutto
        try {
            collection = await client.getCollection({name: collections[model]})
        } catch (e) {
            collection = await client.createCollection({name: collections[model]})
        }
        */
        const response = await collection.get(
            {
                include: [IncludeEnum.Metadatas]
            }
        )

        result = response.metadatas.filter((obj : any)  => obj.page === 1)
            .map((obj : any) => ({
                name: obj.name,
                path: obj.source,
                date: obj.date,
                size: obj.size,
            }));

    }
    catch (e){
        console.log(e)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }


    return NextResponse.json(result, {status: 200});
}
