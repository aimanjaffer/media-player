import { connectToDatabase } from '../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectId;
export default async function userHandler(req,res){
    switch(req.method){
        case 'GET':
            return getUser(req, res);      
    }
}

async function getUser(req,res){
    try {
        let { db } = await connectToDatabase();
        let user = await db
                    .collection('users')
                    .findOne({_id : new ObjectId(req.query.id)});
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