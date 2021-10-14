import { connectToDatabase } from '../../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function trackHandler(req,res){
    switch(req.method){
        case 'GET':
            return getTracksByGenreId(req, res);      
    }
}

async function getTracksByGenreId(req,res){
    try {
        let { db } = await connectToDatabase();
        let tracks = await db
                    .collection('tracks')
                    .find({ genres : new ObjectId(req.query.id) })
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