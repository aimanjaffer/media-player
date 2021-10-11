import { connectToDatabase } from '../../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function userHandler(req,res){
    switch(req.method){
        case 'POST':
            return addAlbumToLikedAlbums(req, res);
    }
}

async function addAlbumToLikedAlbums(req,res){
    try {
        let body = JSON.parse(req.body);
        let userId = body.userId;
        let album = {...body.album , _id: new ObjectId(body.album._id), artistId: new ObjectId(body.album.artistId)};
        let { db } = await connectToDatabase();
        //$addToSet only adds album if the album does not already exist in likedAlbums
        let user = await db
                    .collection('users')
                    .updateOne({ _id: new ObjectId(userId) }, { $addToSet: { likedAlbums: album } });
        return res.json({
            message: JSON.parse(JSON.stringify(user)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}