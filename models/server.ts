
import express, { Application } from "express";
import userRoutes from "../routes/user";
import cors from "cors";
import db from "../db/connection";

class Server {

    private app: Application;
    private port: Number;
    private apiPaths = {
        users: '/api/usuarios'
    };

    constructor() {
        this.app = express();
        this.port = Number.parseInt(process.env.PORT || '8080');

        // Conectar a la base de datos
        this.dbConnection();

        // Definir middlewares
        this.middlewares();

        // definir mis rutas
        this.routes();
    }

    private async dbConnection() {

        try {
            await db.authenticate();
            console.log('DB Online');
            
        } catch (err) {
            console.log(err);            
        }
    }

    private middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));
    }

    private routes() {

        this.app.use(this.apiPaths.users, userRoutes);

    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en: ${this.port}`);
        });
    }

}

export default Server;