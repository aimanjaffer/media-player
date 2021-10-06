import { connectToDatabase } from '../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function albumHandler(req,res){
    switch(req.method){
        case 'GET':
            return getAlbumById(req, res);      
    }
}

async function getAlbumById(req,res){
    try {
        let { db } = await connectToDatabase();
        let album = await db
                    .collection('albums')
                    .findOne({_id : new ObjectId(req.query.id)});
        return res.json({
            message: JSON.parse(JSON.stringify(album)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}