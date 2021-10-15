import { connectToDatabase } from '../../../../lib/mongodb';
export default async function userHandler(req,res){
    switch(req.method){
        case 'GET':
            return getUserByEmail(req, res);
        case 'POST':
            return createUserFromEmail(req, res);
    }
}

async function getUserByEmail(req,res){
    try {
        let { db } = await connectToDatabase();
        let user = await db
                    .collection('users')
                    .findOne({email : req.query.email});
        console.log("user is: ", user);
        if(user){
            return res.json({
                message: JSON.parse(JSON.stringify(user)),
                success: true,
            });
        }else{
            return res.json({
                message: "User not found",
                success: false,
            });
        }
        
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function createUserFromEmail(req,res){
    try {
        let body = JSON.parse(req.body);
        let { db } = await connectToDatabase();
        let user = await db
                    .collection('users')
                    .insertOne({email : body.email, name: body.name});
        console.log(user);
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