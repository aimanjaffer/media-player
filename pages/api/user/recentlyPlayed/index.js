import { connectToDatabase } from '../../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function userHandler(req,res){
    switch(req.method){
        case 'POST':
            return addToRecentlyPlayed(req, res);
    }
}

async function addToRecentlyPlayed(req,res){
    try {
        let body = JSON.parse(req.body);
        let userId = body.userId;
        let type = body.type;
        let item = {};
        switch(type){
            case 'track':
                item = {...body.item, type, _id: new ObjectId(body.item._id), artistId: new ObjectId(body.item.artistId), albumId: new ObjectId(body.item.albumId)};
                break;
            case 'album':
                item = {...body.item, type, _id: new ObjectId(body.item._id), artistId: new ObjectId(body.item.artistId)};
                break;
            case 'playlist':
                item = {...body.item, type, _id: new ObjectId(body.item._id)};
                break;
            case 'artist':
                item = {...body.item, type, _id: new ObjectId(body.item._id)};
                break;
        }
        let { db } = await connectToDatabase();
        let user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        if(user.recentlyPlayed.filter(e => e._id.toHexString() === body.item._id).length > 0){
            return res.json({
                message: "Item already present in RecentlyPlayed array",
                success: true,
            });
        }else{
            let result = await db
                    .collection('users')
                    .updateOne({ _id: new ObjectId(userId) }, {$push: {recentlyPlayed: {$each: [item], $slice: -6}}});
            return res.json({
                message: JSON.parse(JSON.stringify(result)),
                success: true,
            });
        }       
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}