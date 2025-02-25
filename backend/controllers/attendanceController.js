import { Attendance } from '../models/attendanceModel.js';
import { User } from '../models/userModel.js';

// Utility function to get the date 2 months ago
const getTwoMonthsAgoDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 2);
  return date;
};

// Add attendance for login
export const addAttendance = async (req, res) => {
  const { date } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const existingAttendance = await Attendance.findOne({ date, user: req.user._id });
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance for this date already marked.' });
    }

    await Attendance.create({
      date,
      user: req.user._id,
      userName: user.name,
      userEmail: user.email,
    });

    res.status(201).json({ message: 'Attendance marked successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark attendance.' });
  }
};

// Get all attendance records for the logged-in user
export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance records.' });
  }
};

// Clear attendance record for the logged-in user
export const clearAttendance = async (req, res) => {
  try {
    await Attendance.deleteMany({ user: req.user._id });
    res.status(200).json({ message: 'Attendance history cleared.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear attendance history.' });
  }
};

// Get last 2 months of attendance records for all users (Admin only)
export const getAllAttendanceForAdmin = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({
      date: { $gte: getTwoMonthsAgoDate() },
    })
      .populate('user', 'name email')
      .sort({ date: -1 });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all attendance records.' });
  }
};

export const getAllAttendanceAdmin = async (req, res) => {
    try {
      const attendanceRecords = await Attendance.find().sort({ date: -1 });
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch all attendance records.' });
    }
  };
