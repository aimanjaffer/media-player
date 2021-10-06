import { connectToDatabase } from '../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function trackHandler(req,res){
    switch(req.method){
        case 'GET':
            return getTrackById(req, res);      
    }
}

async function getTrackById(req,res){
    try {
        let { db } = await connectToDatabase();
        let track = await db
                    .collection('tracks')
                    .findOne({_id : new ObjectId(req.query.id)});
        return res.json({
            message: JSON.parse(JSON.stringify(track)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}