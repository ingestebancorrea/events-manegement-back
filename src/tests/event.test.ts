import { convertExcelDate } from "../helpers/covertExcelDate";

describe('Funciones asociadas a la lógica de eventos', () => {
    describe('convertExcelDate function', () => {
        test('Debe retornar un Date', () => {
            const result = convertExcelDate(45385);
            expect(result instanceof Date).toBe(true);
        });

        test('Debe retornar una fecha formateada', async () => {
            expect(convertExcelDate(45385)).toStrictEqual(new Date("2024-04-04T00:00:00.000Z"));
        });
    });
});