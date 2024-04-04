export class Event {
    id?: number;
    name: string;
    description: string;
    date: string;
    location_id: string;
    
    constructor(name: string, description: string, date: string, location_id: string, id?: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location_id = location_id;
    }
}
