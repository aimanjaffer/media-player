import { connectToDatabase } from '../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function artistHandler(req,res){
    switch(req.method){
        case 'GET':
            return getArtistById(req, res);      
    }
}

async function getArtistById(req,res){
    try {
        let { db } = await connectToDatabase();
        let artist = await db
                    .collection('artists')
                    .findOne({_id : new ObjectId(req.query.id)});
        return res.json({
            message: JSON.parse(JSON.stringify(artist)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}