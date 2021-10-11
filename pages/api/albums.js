import { connectToDatabase } from '../../lib/mongodb';
export default async function genreHandler(req,res){
    switch(req.method){
        case 'GET':
            return getAlbums(req, res);      
    }
}

async function getAlbums(req, res){
    try {
        let { db } = await connectToDatabase();
        let albums = await db
                    .collection('albums')
                    .find()
                    .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(albums)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}