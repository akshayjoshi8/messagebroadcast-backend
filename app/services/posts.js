const db = require('./../db/connection');

module.exports.getPosts = async (args)=>{
    try{
        const {page} = args;
        let limit = 10;
        let offset = (limit*(page-1));

        let query = `SELECT * FROM posts LIMIT ${limit} OFFSET ${offset}`

        let posts = async ()=>{
            return new Promise((resolve, reject)=>{
                db.all(query, (err, data) => {
                    if (err) { 
                        reject(err)
                        return
                    }
                    resolve(data)
                });
            });
        }

        let postsData = await posts();
        if(!postsData.length) return {success: 1, message: "no posts found!"} ;
        return {success: 1, data: postsData};
    }   
    catch(e){
        throw new Error(e);
    }
}





