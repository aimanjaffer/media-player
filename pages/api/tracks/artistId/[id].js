import { connectToDatabase } from '../../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function trackHandler(req,res){
    switch(req.method){
        case 'GET':
            return getTracksByArtistId(req, res);      
    }
}

async function getTracksByArtistId(req,res){
    try {
        let { db } = await connectToDatabase();
        let tracks = await db
                    .collection('tracks')
                    .find({ artistId : new ObjectId(req.query.id) })
                    .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(tracks)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}