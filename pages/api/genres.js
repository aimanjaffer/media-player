import { connectToDatabase } from '../../lib/mongodb';
export default async function genreHandler(req,res){
    switch(req.method){
        case 'GET':
            return getGenres(req, res);      
    }
}

async function getGenres(req, res){
    try {
        let { db } = await connectToDatabase();
        let genres = await db
                    .collection('genres')
                    .find()
                    .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(genres)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}