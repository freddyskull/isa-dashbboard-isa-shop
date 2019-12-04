"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//importaciones de las rutas de mi api ************ */
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const providerRoutes_1 = __importDefault(require("./routes/providerRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ventasRoutes_1 = __importDefault(require("./routes/ventasRoutes"));
const ventsPendRoutes_1 = __importDefault(require("./routes/ventsPendRoutes"));
const permissRoutes_1 = __importDefault(require("./routes/permissRoutes"));
const priceUsdRoutes_1 = __importDefault(require("./routes/priceUsdRoutes"));
const configRoutes_1 = __importDefault(require("./routes/configRoutes"));
//************************************************* */
// servidor apiRest
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/product/', productRoutes_1.default);
        this.app.use('/api/provider/', providerRoutes_1.default);
        this.app.use('/api/client/', clientRoutes_1.default);
        this.app.use('/api/category/', categoryRoutes_1.default);
        this.app.use('/api/pendientes', ventsPendRoutes_1.default);
        this.app.use('/private/users/', userRoutes_1.default);
        this.app.use('/private/ventas', ventasRoutes_1.default);
        this.app.use('/private/permiss', permissRoutes_1.default);
        this.app.use('/api/usdvalor', priceUsdRoutes_1.default);
        this.app.use('/api/config', configRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server en puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
