import { Router } from 'express';

import { configController } from '../controllers/configController';

class ClientRoutes {
    public router: Router = Router();

    constructor(){
        this.config()
    }
    config(): void {
         this.router.get('/', configController.list );
         this.router.get('/:id', configController.getOne );
         this.router.post('/', configController.create);
         this.router.put('/:id', configController.update);
         this.router.delete('/:id',configController.delete);
    }
}

const clientRoutes = new ClientRoutes();
export default clientRoutes.router;