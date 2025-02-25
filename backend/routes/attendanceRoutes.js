import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addAttendance, clearAttendance, getAllAttendance, getAllAttendanceAdmin, getAllAttendanceForAdmin } from '../controllers/attendanceController.js';
const router = express.Router();

router.get("/get-attendance",isAuth,getAllAttendance);
router.get("/admin/get-attendance",isAuth,getAllAttendanceAdmin);
router.post('/add-attendance',isAuth,addAttendance);
router.delete('/delete-attendance',isAuth,clearAttendance);

export default router;
