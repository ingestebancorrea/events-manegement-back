import { Router } from 'express';
import EventController from '../controllers/EventController';
import multer from 'multer';
import { verifyToken } from '../helpers/jwt';

class EventRoutes {
    public router: Router;
    private eventController: EventController;
    private upload: multer.Multer;

    constructor() {
        this.router = Router();
        this.eventController = new EventController();
        this.upload = multer({ dest: 'uploads/' });
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
        this.router.get('/:id/nearby', verifyToken, this.eventController.findEventsNearbyByLocation.bind(this.eventController));
        this.router.post('/upload', verifyToken, this.upload.single('file'), this.eventController.saveEventsByExcelFile.bind(this.eventController));
    }

    getRouter() {
        return this.router;
    }
}

export default EventRoutes;