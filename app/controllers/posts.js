const {getPosts} = require('./../services/posts');

/*
**
* API FOR GETTING POSTS 
*/
module.exports.getPosts = async (req, res)=>{
    try{ 
        req.params.page = parseInt(req.params.page) || 1;
        const result = await getPosts(req.params);
        if(result.success == 1){
            res.status(200).send(result);
        }else{
            res.status(400).send(result);
        }
    }
    catch(e){
        console.log("ERROR IN GETTING POSTS", e);
        res.status(500).send({success: 0, message: "Internal server error!"});
    }
}