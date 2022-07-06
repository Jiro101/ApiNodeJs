import { Request, Response } from 'express';
import pool from '../database';

class GamesController{

    public async list (req : Request, res : Response): Promise<void> {
        let games = await pool.query('SELECT * FROM games');
        res.json(games);
    }
    
    public async getOne (req : Request, res : Response): Promise<void> {
        let { id } = req.params; 
        let juegoID = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if(juegoID.length > 0){
            res.json(juegoID);
        }else{
            res.status(400).json({message: "juego no existe"});
        }
    }

    public async create (req : Request, res : Response): Promise<void> {
        // res.json('create a games');
        // await console.log([req.body]);
        await pool.query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Juego Guardado'});
    }

    public async delete (req : Request, res : Response): Promise<void>  {
        // res.json('borrar a games ' + req.params.id);
        let { id } = req.params; 
        let juegoDel = await pool.query('DELETE FROM games WHERE id = ?', [id]);
        // if(juegoDel.length > 0){
            // res.json(juegoDel);
        // }else{
            res.json({message: "juego eliminado"});
        // }
    }

    public async update (req : Request, res : Response): Promise<void>  {
        let { id } = req.params;
        let juegoUp = await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'actualizar a games'});
    }

}


export const gamesController = new GamesController();