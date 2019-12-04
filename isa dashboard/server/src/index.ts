import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//importaciones de las rutas de mi api ************ */
import indexRoutes from './routes/indexRoutes';
import productRoutes from './routes/productRoutes';
import providerRoutes from './routes/providerRoutes';
import clientRoutes from './routes/clientRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import ventasRoutes from './routes/ventasRoutes'; 
import ventasPendRoutes from './routes/ventsPendRoutes'; 
import permissRoutes from './routes/permissRoutes'; 
import priceUsdRoutes from './routes/priceUsdRoutes';
import configRoutes  from './routes/configRoutes'
//************************************************* */

// servidor apiRest

class Server {

  public  app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    
    config(): void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));    
    }
    routes(): void{
        this.app.use(indexRoutes);
        this.app.use('/api/product/',productRoutes);
        this.app.use('/api/provider/',providerRoutes);
        this.app.use('/api/client/',clientRoutes);
        this.app.use('/api/category/',categoryRoutes);
        this.app.use('/api/pendientes',ventasPendRoutes);
        this.app.use('/private/users/',userRoutes);
        this.app.use('/private/ventas',ventasRoutes);
        this.app.use('/private/permiss',permissRoutes);
        this.app.use('/api/usdvalor', priceUsdRoutes);
        this.app.use('/api/config', configRoutes);
    }
    start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log('server en puerto', this.app.get('port'))
        });
    }
}

const server = new Server ();
server.start();
