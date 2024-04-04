export class Location {
    id?: number;
    name: string;
    latitude: number;
    length: number;
    
    constructor(name: string, latitude: number, length: number, id?: number) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.length = length;
    }
}