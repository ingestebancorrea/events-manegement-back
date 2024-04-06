import dotenv from 'dotenv';
import { dbConnection } from "../databases/config";
import { Event } from "../models/EventModel";
import { AllEvents } from "../types/interfaces";

dotenv.config();

class EventService {
    async create(name: string, description: string, date: string, location_id: string): Promise<Event> {
        try {
            const result = await dbConnection.query("INSERT INTO events VALUES(nextval('events_id_seq'), $1, $2, $3,$4) RETURNING id", [name, description, date, location_id]);
            const eventId = result.rows[0].id;

            return {
                id: eventId,
                name,
                description,
                date,
                location_id
            };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create event.');
        }
    }

    async getAllEvents(): Promise<AllEvents[]> {
        try {
            const results: AllEvents[] = [];
            const events = await dbConnection.query("SELECT * FROM events e");

            for (let event of events.rows) {
                results.push({
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    date: event.date,
                })
            }

            return results;
        } catch (error) {
            console.log(error);
            throw new Error('Failure getting events.');
        }
    }

    async getOne(id: string) {
        try {
            let results: AllEvents | null = null;

            const events = await dbConnection.query("SELECT e.*,l.name as location_name FROM events e LEFT JOIN locations l ON e.location_id = l.id WHERE e.id = $1", [id]);

            for (let event of events.rows) {
                const { location_id, latitude, length, location_name, ...rest } = event;
                results = {
                    ...rest,
                    location: {
                        id: event.location_id,
                        name: event.location_name,
                        latitude: event.latitude,
                        length: event.length
                    }
                };
            }

            if (!results) {
                return null;
            }

            return results;
        } catch (error) {
            console.log(error);
            throw new Error('Failure getting one event.');
        }
    }

    async update(name: string, description: string, date: string, location_id: string, id: string): Promise<number | null> {
        try {
            const result = await dbConnection.query("UPDATE events e SET name=$1, description=$2, date=$3, location_id=$4 WHERE e.id = $5", [name, description, date, location_id, id]);

            const eventUpdated = result.rowCount;
            return eventUpdated;
        } catch (error) {
            console.log(error);
            throw new Error('Failure updating event.');
        }
    }

    async delete(id: string): Promise<number | null> {
        try {
            const result = await dbConnection.query("DELETE FROM events e WHERE e.id = $1", [id]);

            const eventDeleted = result.rowCount;
            return eventDeleted;
        } catch (error) {
            console.log(error);
            throw new Error('Failure deleting event.');
        }
    }

    async findEventsNearbyByLocation(latitude: number, length: number) {
        const apiKey = process.env.API_KEY;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${length},${latitude}.json?access_token=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw new Error('Failure finding event nearby by location.');
        }
    }

    async saveEventsByExcelFile(){
        try {
            
            
        } catch (error) {
            console.log(error);
            throw new Error('Failure uploading events to database.');
        }
    }

}

export default EventService;