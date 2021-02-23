# Projeto nlw3 - APS NPS
## Day one
> yarn init -y => cria o package.json
> yarn add express (micro-framework)
> yarn add typescript -D (The JS not undertand *.ts)
> yarn tsc --init (Starts Typescrip into app) => It is created tsconfig.js
> yarn add ts-node-dev -D (convertion to js)
> Add into package.json:
"scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
> run: "yarn dev" => "server is running" in terminal/console
> igore node_modules and no check errors:
  "scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  },
> creating the first route:
import express from 'express';

const app = express();

app.get("/users", (request, response)=>{
    // return response.send('Hello World NLW#4');
    return response.json({message:'Hello World - NLW#4'});
});

app.listen(3333, ()=> console.log("server is running"));
> Use insominia to get POST verb request

## Day two - Data Base
> yarn add typeorm reflect-metadata
> yarn add sqlite3 (Choice sqlite3)
> create ormconfig.json file into root folder:
{
    "type": "sqlite",    
    "database": "./src/database/database.sqlite"
}
> The ./src/database/databse.sqlite file: will create, when run yarn dev command, after the configurarion this files ( index.ts and ormconfig.json)
> create ./src/database/index.ts:
import { createConnection } from "typeorm";

createConnection();
> edit server.ts file into imports place:
//
import "reflect-metadata";
import express from 'express';
import "./database";
//




