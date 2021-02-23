import express from 'express';

const app = express();

/**
 *  first par am  => Route (API recurse)
 *  secondy param => request, response
 */
app.get("/", (request, response)=>{
    // return response.send('Hello World NLW#4');
    return response.json({message:'Hello World - NLW#4'});
});

app.post("/", (request, response)=>{
    return response.json({message:"Opa, post deu certo"});
});

app.listen(3333, ()=> console.log("server is running"));

