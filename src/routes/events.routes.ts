import { Router } from 'express';
import EventController from '../controllers/EventController';
import { verifyToken } from '../helpers/jwt';

class EventRoutes {
    public router: Router;
    private eventController: EventController;

    constructor() {
        this.router = Router();
        this.eventController = new EventController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('', verifyToken, this.eventController.create.bind(this.eventController));
        this.router.get('/', verifyToken, this.eventController.getAllEvents.bind(this.eventController));
        this.router.get('/:id', verifyToken, this.eventController.getOne.bind(this.eventController));
        this.router.put('/:id', verifyToken, this.eventController.update.bind(this.eventController));
        this.router.delete('/:id', verifyToken, this.eventController.delete.bind(this.eventController));
        this.router.post('/:id/attendances', verifyToken, this.eventController.registerAttendances.bind(this.eventController));
        this.router.get('/:id/attendances', verifyToken, this.eventController.findAttendence.bind(this.eventController));
        this.router.get('/nearby/latitude/:lat/length/:leng', verifyToken, this.eventController.findEventsNearbyByLocation.bind(this.eventController));
    }

    getRouter() {
        return this.router;
    }
}

export default EventRoutes;