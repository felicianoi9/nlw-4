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
> The ./src/database/databse.sqlite file be will create, when run yarn dev command, after the configurarion this files ( index.ts and ormconfig.json)
> create ./src/database/index.ts:
import { createConnection } from "typeorm";

createConnection();
> edit server.ts file into imports place:
//
import "reflect-metadata";
import express from 'express';
import "./database";
//
> create database migrate:
>
> Updata ormconfig 
{
    "type": "sqlite",    
    "database": "./src/database/database.sqlite",
    "migrations":["./src/database/migrations/**.ts"],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
>
> run yarn typeorm migration:create -n CreateUsers:
import {MigrationInterface, QueryRunner , Table} from "typeorm";

export class CreateUsers1614102367036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },

                ]
            })
        ) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
>
> run: yarn typeorm migration:run ( run all migrates )
>
> run: yarn typeorm migration:revert ( undo last migrate )

## Refatoring the code
> Add controllers and models folders into src folder
> created routes.ts file
import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();

router.post("/users", userController.create);

export { router };

> changes server.ts file:
import "reflect-metadata";
import express from 'express';
import "./database";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, ()=> console.log("server is running"));

> uncomment  lines into tsconfig.json file:
>
> "strictPropertyInitialization": false (change true to false value)
>
> "experimentalDecorators": true,
>
> "emitDecoratorMetadata": true,
> run: yarn add uuid
> run: yarn add @types/uuid -D
> Created User.ts into models folder
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
export { User };

>> #jornadainfinita

## Day three - Repository
> create src/repositories folder
> create src/repositories/UsersRepository.ts
> Into UserController.ts, change User to UsersRepository across getCustomRepository
> create migration: yarn typeorm migration:create -n CreateSurveys
> run:  yarn typeorm migration:run
> created Survey model
> create SurveyController.ts and SurveysRepository.ts
> creates routes post("/surveys") and get("/surveys")
> run: yarn dev and verify across insominia

### Testes Automatizados:
1. Testes unitários
> TDD desenvolvimento orientado a testes
>
> Começa pela funcionalidade;
>
> Finalizando no código em si;
2. Testes de Integração
> Teste da funcionalidade completa ( exemplo: teste de acesso do usuário: cadastro, login, recuperação de senha, autenticação ) - vais ser utilizado neste evento.
3. Ponta a pont ( E2E )
> Mais utilizado no frontend;
4. Backend usa o teste unitário e de integração

> install jest: yarn add jest @types/jest -D
> jest configuration: yarn jest --init
>
> Answers: yes yes node no v8 yes 

### jest.config
> bail: true
> // testEnvironment: "node"
> tests path:
>
> change:
> // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
>
> to 
> 
> testMatch: ["**/__tests__/*.test.ts"],

> create ./src/__tests__  folder
> create ./src/__tests__/first.test.ts   file
> yarn add ts-jest -D
> into jest.config:
>
> describe("First", () => {
    it("Deve ser possível somar 2 números", () => {
        expect(2 + 2).toBe(4);
    });
});
> run yarn test
>
>  change: // preset: undefined, to preset: "ts-jest",
> [https://jestjs.io/docs/en/getting-started]jest documentation:

> [https://www.npmjs.com/package/supertest] using supertest:
Install and types
> yarn add supertest @types/supertest -D

#focopraticagrupo






