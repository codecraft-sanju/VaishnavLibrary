import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserData } from './User';

const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const { role } = UserData(); 
  // Fetch attendance history
  const fetchAttendanceHistory = async () => {
    if (!role || hasFetched) return; 

    try {
      const endpoint =
        role === 'admin' ? '/api/attendance/get-attendance' : '/api/attendance/get-attendance'; 
      const response = await axios.get(endpoint);
      setAttendanceHistory(response.data || []);
      setHasFetched(true); 
    } catch (error) {
      console.error('Failed to fetch attendance records.');
      toast.error('Failed to fetch attendance records.'); 
    }
  };

  // Mark attendance
  const markAttendance = async (date) => {
    try {
      const response = await axios.post('/api/attendance/add-attendance', { date });

      if (response.status === 201) {
        toast.success('Attendance marked for today!');
        setAttendanceHistory((prev) => [...prev, { date }]); 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to mark attendance.';
      toast.info(errorMessage); 
    }
  };

  // Clear attendance history
  const clearAttendanceHistory = async () => {
    try {
      await axios.delete('/api/attendance/delete-attendance');
      setAttendanceHistory([]); 
      toast.success('Attendance history cleared!');
      setHasFetched(false); 
    } catch (error) {
      toast.error('Failed to clear attendance history.');
    }
  };

  useEffect(() => {
    if (role) {
      fetchAttendanceHistory();
    }
  }, [role]);

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
