"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let games = yield database_1.default.query('SELECT * FROM games');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let juegoID = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
            if (juegoID.length > 0) {
                res.json(juegoID);
            }
            else {
                res.status(400).json({ message: "juego no existe" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.json('create a games');
            // await console.log([req.body]);
            yield database_1.default.query('INSERT INTO games set ?', [req.body]);
            res.json({ message: 'Juego Guardado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.json('borrar a games ' + req.params.id);
            let { id } = req.params;
            let juegoDel = yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            // if(juegoDel.length > 0){
            // res.json(juegoDel);
            // }else{
            res.json({ message: "juego eliminado" });
            // }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let juegoUp = yield database_1.default.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'actualizar a games' });
        });
    }
}
exports.gamesController = new GamesController();
