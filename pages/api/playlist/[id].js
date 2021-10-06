import { connectToDatabase } from '../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function playlistHandler(req,res){
    switch(req.method){
        case 'GET':
            return getPlaylistById(req, res);      
    }
}

async function getPlaylistById(req,res){
    try {
        let { db } = await connectToDatabase();
        let playlist = await db
                    .collection('playlists')
                    .findOne({_id : new ObjectId(req.query.id)});
        return res.json({
            message: JSON.parse(JSON.stringify(playlist)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}