import { connectToDatabase } from '../../../../lib/mongodb';
export default async function userHandler(req,res){
    switch(req.method){
        case 'POST':
            return createUserFromEmail(req, res);
    }
}

async function createUserFromEmail(req,res){
    try {
        let body = JSON.parse(req.body);
        let { db } = await connectToDatabase();
        let user = await db
                    .collection('users')
                    .insertOne({email : body.email, name: body.name});
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