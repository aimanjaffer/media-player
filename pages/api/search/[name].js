import { connectToDatabase } from '../../../lib/mongodb';
export default async function genreHandler(req,res){
    switch(req.method){
        case 'GET':
            return searchByName(req, res);      
    }
}

async function searchByName(req, res){
    try {
        let { db } = await connectToDatabase();
        let searchRegex = new RegExp(".*"+req.query.name+".*");
        //console.log(searchRegex);
        let albums = await db
                    .collection('albums')
                    .find({ name: { $regex: searchRegex, '$options' : 'i' } })
                    .toArray();
        let artists = await db
                    .collection('artists')
                    .find({ name: { $regex: searchRegex, '$options' : 'i' } })
                    .toArray();
        let tracks = await db
                    .collection('tracks')
                    .find({ name: { $regex: searchRegex, '$options' : 'i' } })
                    .toArray();
        let playlists = await db
                    .collection('playlists')
                    .find({ name: { $regex: searchRegex, '$options' : 'i' } })
                    .toArray();
        albums = albums.map(album => {
            return {...album, type: 'album'}
        });
        tracks = tracks.map(track => {
            return {...track, type: 'track'}
        });
        artists = artists.map(artist => {
            return {...artist, type: 'artist'}
        });
        playlists = playlists.map(playlist => {
            return {...playlist, type: 'playlist'}
        });
        let results = [...albums, ...artists, ...tracks, ...playlists];        
        return res.json({
            message: JSON.parse(JSON.stringify(results)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}