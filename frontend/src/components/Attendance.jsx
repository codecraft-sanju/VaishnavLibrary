import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import { useAttendance } from '../context/Attendance';

const localizer = momentLocalizer(moment);

const Attendance = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { attendanceHistory, markAttendance, clearAttendanceHistory } =
    useAttendance();

  const handleSelectSlot = ({ start }) => {
    const today = moment().startOf('day');
    const selectedDate = moment(start).startOf('day');
    const isToday = selectedDate.isSame(today);

    if (isToday) {
      markAttendance(today.format('YYYY-MM-DD'));
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="w-full max-w-lg p-6 mb-6 text-center bg-white rounded-lg shadow-md">
        <h1 className="mb-2 text-3xl font-bold">
          Welcome to Attendance Tracker
        </h1>
        <p className="text-gray-600">
          Click on today’s date to mark your attendance. Keep track of your
          attendance history below.
        </p>
      </div>

      <div className="flex flex-col w-full max-w-5xl md:flex-row">
        <div className="flex-1 p-6 mb-4 mr-0 bg-white rounded-lg shadow-lg md:mr-4 md:mb-0">
          <h2 className="mb-4 text-2xl font-bold text-center">
            Mark Your Attendance
          </h2>
          <Calendar
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            style={{ height: '500px' }}
            onSelectSlot={handleSelectSlot}
          />
          {showPopup && (
            <div className="p-3 mt-4 text-red-700 bg-red-100 rounded">
              Only today’s date can be selected!
            </div>
          )}
        </div>

        <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-64">
          <h2 className="mb-4 text-xl font-semibold">Attendance History</h2>
          {attendanceHistory.length > 0 ? (
            <ul className="text-left list-disc list-inside">
              {attendanceHistory.map((record, index) => (
                <li key={record._id || index} className="text-gray-700">
                  {record.date}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No attendance records yet.</p>
          )}
          {attendanceHistory.length > 0 && (
            <button
              onClick={clearAttendanceHistory}
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Clear Attendance History
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
