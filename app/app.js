const db = require('./db/connection');
const app = require('express')();
const fetch = require('node-fetch');
const {getPosts} = require('./controllers/posts');
const cors = require('cors');

app.use(cors()); // accepting all cors for dev environment

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
});


// IIFE FOR FETCHING DATA IN THE INITIAL LOAD
(async function (){
    try{
        let data = await fetch('https://jsonplaceholder.typicode.com/comments');
        data = await data.json();
        let formatData = [];
        data.forEach(post=>{
            delete post.id;
            let postKeys = Object.keys(post);
            postKeys.forEach(key=>{
                formatData.push([post[key]])
            })
        })

        let placeholder = data.map(() => `(?, ?, ?, ?)`).join(', ');
        let query = 'INSERT INTO posts(postId, name, email, body) VALUES ' + placeholder;

        db.run(query, formatData, function(err) {
            if (err) console.error(err.message);
            console.log(`Rows inserted ${this.changes}`);
        });
    }
    catch(e){
        console.log("ERROR IN FETCHING DATA", e);
        // handle error
    }
})();

// Route for getting posts
app.get('/posts/:page', getPosts);