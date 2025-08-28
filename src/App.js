import PostManager from "./Post";
import TodoWork from "./TodoWork";
import { Route, Routes } from "react-router";
import UserTable from "./UserTable";
import Sidebar from "./Sidebar";
import EditUsersTable from "./EditUser";
import EditUser from "./EditUser";
import EditPost from "./EditPost";
import { useEffect, useState } from "react";
import axios from "axios";
import Setting from "./Setting";

export default function Dashboard() {
    const [userCount, setUserCount] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        // Fetch user count
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => setUserCount(res.data.length))
            .catch(err => console.log(err));

        // Fetch post count
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => setPostCount(res.data.length))
            .catch(err => console.log(err));

        // Fetch recent activity (sample data based on users and posts)
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                const activities = res.data.slice(0, 3).map((user, index) => ({
                    user: user.name,
                    action: index === 0 ? "Logged in" : index === 1 ? "Updated profile" : "Posted a blog",
                    time: index === 0 ? "5 mins ago" : index === 1 ? "15 mins ago" : "30 mins ago"
                }));
                setRecentActivities(activities);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-950">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-800">
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                </div>
                <div className="flex-1 p-6 overflow-auto">
                    <Routes>
                        <Route path="/" element={
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-semibold text-gray-300">Total Users</h3>
                                    <p className="text-2xl text-white">{userCount}</p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-semibold text-gray-300">Posts Count</h3>
                                    <p className="text-2xl text-white">{postCount}</p>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-semibold text-gray-300">Active Sessions</h3>
                                    <p className="text-2xl text-white">{Math.floor(userCount * 0.5)}</p>
                                </div>
                                <div className="md:col-span-3 mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold text-gray-300">Recent Activity</h3>
                                    <table className="w-full mt-4 text-sm">
                                        <thead>
                                        <tr className="bg-gray-700 text-gray-300">
                                            <th className="p-2 text-left">User</th>
                                            <th className="p-2 text-left">Action</th>
                                            <th className="p-2 text-left">Time</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {recentActivities.map((activity, index) => (
                                            <tr key={index} className="hover:bg-gray-700 transition-colors text-white">
                                                <td className="p-2">{activity.user}</td>
                                                <td className="p-2">{activity.action}</td>
                                                <td className="p-2">{activity.time}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        } />
                        <Route path="/Users" element={<UserTable/>} />
                        <Route path="/Posts" element={<PostManager />} />
                        <Route path="/Todowork" element={<TodoWork />} />
                        <Route path="/Settings" element={<Setting/>}/>
                        <Route path="/EditUser" element={<EditUsersTable/>}>
                            <Route path=":id" element={<EditUser/>}/>
                        </Route>
                        <Route path="/EditPost/:id" element={<EditPost/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}