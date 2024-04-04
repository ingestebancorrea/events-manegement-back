import { dbConnection } from "../databases/config";

class AttendanceService {
    async findAttendance(id: string): Promise<any[]> {
        try {
            const result = await dbConnection.query("SELECT * FROM attendances WHERE user_id = $1 AND event_id = $2", [userId, id]);
            
            const attendanceSaved = result.rows;
            return attendanceSaved;
        } catch (error) {
            console.log(error);
            throw new Error('Failure finding attendance.');
        }
    }

    async registerAttendances(id: string): Promise<number | null>{
        try{
            const result = await dbConnection.query("INSERT INTO attendances VALUES(nextval('attendances_id_seq'),$1,$2)", [userId,id]);
            
            const attendanceCreated = result.rowCount;
            return attendanceCreated;
        }catch(error){
            console.log(error);
            throw new Error('Failure creating attendance.');
        }
    }

    async findUsers(id: string){
        try {
            let results = [];
            const attendences = await dbConnection.query("SELECT a.*,u.name FROM attendances a LEFT JOIN users u on a.user_id = u.id WHERE a.user_id = $1 AND a.event_id =$2", [userId,id]);
            
            for (let attendence of attendences.rows) {
                const { id, event_id,...rest } = attendence;
                results.push(rest)
            }
    
            if (!results) {
                return null;
            }
    
            return results;
        } catch (error) {
            console.log(error);
            throw new Error('Failure finding attendance.');
        }
    }
}

export default AttendanceService;