import { useState, useEffect } from "react";
import { UserData } from "../context/User";
import { useAttendance } from "../context/Attendance";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const { getAllUsers } = UserData();
  const { attendanceHistory, fetchAttendanceHistory } = useAttendance();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getAllUsers();
      setUsers(userList);
    };

    fetchUsers();
    fetchAttendanceHistory();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 text-white p-4 md:block hidden">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li
            className={`p-3 cursor-pointer hover:bg-gray-700 rounded ${
              activeTab === "users" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </li>
          <li
            className={`p-3 cursor-pointer hover:bg-gray-700 rounded ${
              activeTab === "attendance" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("attendance")}
          >
            Attendance
          </li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-gray-800 text-white p-4 flex justify-between">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <select
          className="bg-gray-700 p-2 rounded"
          onChange={(e) => setActiveTab(e.target.value)}
          value={activeTab}
        >
          <option value="users">Users</option>
          <option value="attendance">Attendance</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "users" ? <Users users={users} /> : <Attendance attendanceHistory={attendanceHistory} />}
      </div>
    </div>
  );
}

// Users Component
function Users({ users }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border border-gray-300">{user.name}</td>
                <td className="p-2 border border-gray-300">{user.email}</td>
                <td className="p-2 border border-gray-300">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Attendance Component
function Attendance({ attendanceHistory }) {
    console.log(attendanceHistory)
  return (
    <div className="overflow-x-auto">
      <h2 className="mt-6 text-xl font-bold">Attendance Records</h2>
      <table className="w-full mt-4 border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceHistory?.length > 0 ? (
            attendanceHistory.map((record, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border border-gray-300">{record.userName}</td>
                <td className="p-2 border border-gray-300">{record.userEmail}</td>
                <td className="p-2 border border-gray-300">{record.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
