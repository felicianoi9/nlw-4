import express from 'express';

const app = express();

app.get("/users", (request, response)=>{
    // return response.send('Hello World NLW#4');
    return response.json({message:'Hello World - NLW#4'});
});

app.listen(3333, ()=> console.log("server is running"));

