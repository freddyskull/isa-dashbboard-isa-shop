import {Request, Response} from 'express';

import database from '../database'


class ConfigController {

   public async list (req: Request, res: Response): Promise<void> { 
       const config = await database.query('SELECT * FROM config');
       res.json(config);
    }
    public async getOne (req: Request, res: Response): Promise<any> { 
        const { id } = req.params;
        const config = await database.query('SELECT * FROM config WHERE id = ?', [id]);
        if(config.length > 0){
            return res.json(config[0]);
        }
        res.status(404).json({text: 'la Configuración: '+ req.params.id +' no fué encontrado'})
     }
    public async create (req: Request, res: Response): Promise<void>  { 
        await database.query('INSERT INTO config set ?', [req.body]);
        console.log(req.body);
        res.json({message: 'Configuración guardado'});

    }
    public async update (req: Request, res: Response): Promise<void>  { 
        const { id } = req.params;
        await database.query('UPDATE config SET ? WHERE id = ?', [req.body ,id])
        res.json({text: 'la Configuración: '+ req.params.id +' fué actualizado' });
    }
    public async delete (req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        await database.query('DELETE FROM config WHERE id = ?', [id])
        res.json({message: 'La Configuración se ha eliminado'}); 
    }

}

export const configController = new ConfigController();