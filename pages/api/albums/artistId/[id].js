import { connectToDatabase } from '../../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function trackHandler(req,res){
    switch(req.method){
        case 'GET':
            return getAlbumsByArtistId(req, res);      
    }
}

async function getAlbumsByArtistId(req,res){
    try {
        let { db } = await connectToDatabase();
        let albums = await db
                    .collection('albums')
                    .find({ artistId : new ObjectId(req.query.id) })
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