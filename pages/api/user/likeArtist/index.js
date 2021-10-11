import { connectToDatabase } from '../../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function userHandler(req,res){
    switch(req.method){
        case 'POST':
            return addArtistToLikedArtists(req, res);
    }
}

async function addArtistToLikedArtists(req, res){
    try {
        let body = JSON.parse(req.body);
        let userId = body.userId;
        let artist = {...body.artist , _id: new ObjectId(body.artist._id)};
        let { db } = await connectToDatabase();
        let user = await db
                    .collection('users')
                    .updateOne({ _id: new ObjectId(userId) }, { $addToSet: { likedArtists: artist } });
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