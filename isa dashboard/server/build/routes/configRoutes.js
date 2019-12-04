"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configController_1 = require("../controllers/configController");
class ClientRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', configController_1.configController.list);
        this.router.get('/:id', configController_1.configController.getOne);
        this.router.post('/', configController_1.configController.create);
        this.router.put('/:id', configController_1.configController.update);
        this.router.delete('/:id', configController_1.configController.delete);
    }
}
const clientRoutes = new ClientRoutes();
exports.default = clientRoutes.router;
