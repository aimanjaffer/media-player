import { connectToDatabase } from '../../../../lib/mongodb';
export default async function userHandler(req,res){
    switch(req.method){
        case 'GET':
            return getUserByEmail(req, res);      
    }
}

async function getUserByEmail(req,res){
    try {
        let { db } = await connectToDatabase();
        let user = await db
                    .collection('users')
                    .findOne({email : req.query.email});
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