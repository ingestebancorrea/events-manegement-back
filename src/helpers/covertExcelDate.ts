export const convertExcelDate = (serial: number): Date => {
    const baseDate = new Date('1900-01-01');
    
    // Convertir el número de serie a días y sumarlo a la fecha base
    const date = new Date(baseDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
    return date;
};