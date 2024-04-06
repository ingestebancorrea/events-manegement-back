export interface AllEvents {
    id: string;
    name: string;
    description: string;
    date: Date;
    location?: {
        id: string;
        name: string;
        latitude: number;
        length: number;
    };
};

export interface ExcelEventData {
    Nombre: string;
    Descripcion: string;
    Fecha: number;
    Ubicacion: string;
    Latitud: number;
    Longitud: number;
}