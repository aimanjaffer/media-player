import { connectToDatabase } from '../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function genreHandler(req,res){
    switch(req.method){
        case 'GET':
            return getGenreById(req, res);      
    }
}

async function getGenreById(req,res){
    try {
        let { db } = await connectToDatabase();
        let genre = await db
                    .collection('genres')
                    .findOne({_id : new ObjectId(req.query.id)});
        return res.json({
            message: JSON.parse(JSON.stringify(genre)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}