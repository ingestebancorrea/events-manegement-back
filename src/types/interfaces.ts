interface AllEvents {
    id: string;
    name: string;
    description: string;
    date: Date;
    location: {
        id: string;
        name: string;
        latitude: number;
        length: number;
    };
};