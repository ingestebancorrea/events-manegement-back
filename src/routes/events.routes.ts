import { Router } from 'express';
import EventController from '../controllers/EventController';

class EventRoutes {
    public router: Router;
    private eventController: EventController;

    constructor() {
        this.router = Router();
        this.eventController = new EventController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('', (req, res) => res.send('hello world'));
        this.router.get('/{id}', (req, res) => res.send('hello world'));
        this.router.get('/', (req, res) => res.send('hello world'));
        this.router.put('', (req, res) => res.send('hello world'));
        this.router.delete('', (req, res) => res.send('hello world'));
    }

    getRouter() {
        return this.router;
    }
}

export default EventRoutes;