import { Request, Response } from 'express';
import EventService from '../services/EventService';
import LocationService from '../services/LocationService';
import AttendanceService from '../services/AttendanceService';

class EventController {

    private eventService: EventService;
    private locationService: LocationService;
    private attendanceService: AttendanceService;

    constructor() {
        this.eventService = new EventService();
        this.locationService = new LocationService();
        this.attendanceService = new AttendanceService();
    }

    async create(req: Request, res: Response) {
        try {
            const { name, description, date, location: { name: locationName, latitude, length } } = req.body;

            // Save location
            const location = await this.locationService.create(locationName, latitude, length);

            // Save event
            const newEvent = await this.eventService.create(name, description, date, location.id?.toString()!);

            res.status(201).json({
                id: newEvent.id,
                name: newEvent.name,
                description: newEvent.description,
                date: newEvent.date,
                idLocation: location.id
            });
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }

    async getAllEvents(req: Request, res: Response) {
        try {
            const events = await this.eventService.getAllEvents();

            res.status(200).send(JSON.stringify(events));
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const event = await this.eventService.getOne(id);

            if (!event) {
                return res.status(404).json({
                    msg: 'No existe un evento registrado con el id suministrado.'
                });
            }

            res.status(200).send(JSON.stringify(event));
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, date, location: { name: locationName, latitude, length } } = req.body;

            const eventSaved = await this.eventService.getOne(id);

            if (!eventSaved) {
                return res.status(404).json({
                    msg: 'No existe un evento registrado con el id suministrado.'
                });
            }

            // Update location
            const location = await this.locationService.update(locationName, latitude, length, eventSaved.location.id);

            // Update event
            const event = await this.eventService.update(name, description, date, location.id?.toString()!, id);

            if (event) {
                res.status(200).json({
                    msg: 'El evento ha sido actualizado satisfactoriamente.'
                });;
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const eventSaved = await this.eventService.getOne(id);

            if (!eventSaved) {
                return res.status(404).json({
                    msg: 'No existe un evento registrado con el id suministrado.'
                });
            }

            // Delete event
            const eventDeleted = await this.eventService.delete(id);

            // Delete location
            await this.locationService.delete(eventSaved.location.id);

            if (eventDeleted) {
                res.status(200).json({
                    msg: 'El evento ha sido eliminado satisfactoriamente.'
                });;
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }

    async registerAttendances(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const eventSaved = await this.eventService.getOne(id);

            if (!eventSaved) {
                return res.status(404).json({
                    msg: 'No existe un evento registrado con el id suministrado.'
                });
            }

            const registeredAttendance = await this.attendanceService.findAttendance(id);

            if (registeredAttendance) {
                res.status(400).json({
                    msg: 'El usuario ya fue registrado al evento anteriormente.'
                });;
            }

            const registerAttendance = await this.attendanceService.registerAttendances(id);

            if (registerAttendance) {
                res.status(200).json({
                    msg: 'El usuario fue registrado satisfactoriamente al evento.'
                });;
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }

    async findAttendence(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const eventSaved = await this.eventService.getOne(id);

            if (!eventSaved) {
                return res.status(404).json({
                    msg: 'No existe un evento registrado con el id suministrado.'
                });
            }

            const registeredAttendance = await this.attendanceService.findAttendance(id);

            if (!registeredAttendance) {
                res.status(404).json({
                    msg: 'No existen registros de asistencia para el id de evento suministrado.'
                });
            }

            const usersSaved = await this.attendanceService.findUsers(id);

            res.status(200).json({
                id: eventSaved.id,
                name: eventSaved.name,
                description: eventSaved.description,
                date: eventSaved.date,
                atendees: usersSaved
            });
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }

    async findEventsNearbyByLocation(req: Request, res: Response) {
        try {
            const { lat, leng } = req.params;
            
            if (typeof lat !== 'string' || typeof leng !== 'string') {
                throw new Error('Latitude and length must be strings');
            }

            const data = await this.eventService.findEventsNearbyByLocation(lat, leng);
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }
}

export default EventController;