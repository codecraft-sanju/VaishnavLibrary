import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserData } from './User';

const AttendanceContext = createContext();


const AttendanceProvider = ({ children }) => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const { role } = UserData(); // Get role from User context

  // Fetch attendance history
  const fetchAttendanceHistory = async () => {
    if (!role || hasFetched) return; // Ensure role is available and prevent multiple calls

    try {
      const endpoint = role === 'admin' ? '/api/attendance/admin/get-attendance' : '/api/attendance/get-attendance';
      const response = await axios.get(endpoint);
      setAttendanceHistory(response.data.map((record) => record));
      setHasFetched(true); // Mark as fetched
    } catch (error) {
      console.error('Failed to fetch attendance records.');
    }
  };

  // Mark attendance
  const markAttendance = async (date) => {
    try {
      const response = await axios.post('/api/attendance/add-attendance', { date });

      if (response.status === 201) {
        toast.success('Attendance marked for today!');
        setAttendanceHistory((prev) => [...prev, date]);
      }
    } catch (error) {
      toast.info(error.response?.data?.error || 'Failed to mark attendance.');
    }
  };

  // Clear attendance history
  const clearAttendanceHistory = async () => {
    try {
      await axios.delete('/api/attendance/delete-attendance');
      setAttendanceHistory([]);
      toast.success('Attendance history cleared!');
      setHasFetched(false); // Allow refetching when history is cleared
    } catch (error) {
      toast.error('Failed to clear attendance history.');
    }
  };

  useEffect(() => {
    fetchAttendanceHistory();
  }, [role]); // Runs when role changes

  return (
    <AttendanceContext.Provider
      value={{ attendanceHistory, fetchAttendanceHistory, markAttendance, clearAttendanceHistory }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
export default AttendanceProvider;


