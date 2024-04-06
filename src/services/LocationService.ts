import { dbConnection } from "../databases/config";
import { Location } from "../models/LocationModel";

class LocationService {
    async create(name: string, latitude: number, length: number): Promise<Location>{
        try {
            const result = await dbConnection.query("INSERT INTO locations VALUES(nextval('locations_id_seq'), $1, $2, $3) RETURNING id", [name, latitude.toString(), length.toString()]);
            const locationId = result.rows[0].id;
            
            return {
                id: locationId,
                name,
                latitude,
                length
            };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create location.');
        }
    }

    async update(name: string, latitude: number, length: number, id: string): Promise<Location>{
        try {
            const result = await dbConnection.query("INSERT INTO locations VALUES(nextval('locations_id_seq'), $1, $2, $3) RETURNING id", [name, latitude.toString(), length.toString()]);
            const locationId = result.rows[0].id;
            
            return {
                id: locationId,
                name,
                latitude,
                length
            };
        } catch (error) {
            console.log(error);
            throw new Error('Failure updating location.');
        }
    }

    async delete(id: string): Promise<number | null>{
        try{
            const result = await dbConnection.query("DELETE FROM locations l WHERE l.id = $1", [id]);
            
            const locationDeleted = result.rowCount;
            return locationDeleted;
        }catch(error){
            console.log(error);
            throw new Error('Failure deleting location.');
        }
    }
}

export default LocationService;