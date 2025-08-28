import { useState } from 'react';
import { FaBars, FaTimes, FaTachometerAlt, FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const links = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', to: "/" },
    { icon: <FaUsers />, label: 'Users', to: "/Users" },
    { icon: <FaFileAlt />, label: 'Posts', to: "/Posts" },
    { icon: <FaCog />, label: 'Settings', to: "/Settings" },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('userName' || "Admin"));

    return (
        <>
            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden">
                <button
                    onClick={() => setOpen(true)}
                    className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition-colors"
                >
                    <FaBars size={20} />
                </button>
            </div>

            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col bg-gray-900 text-gray-200 w-64 min-h-screen p-6 space-y-6 shadow-lg">
                <div className="flex flex-col items-center">
                    <img className="w-16 h-16 rounded-full border border-gray-700" src="" alt="" />
                    <p className="mt-2 text-gray-300 font-semibold">{username}</p>
                </div>

                <nav className="space-y-2">
                    {links.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                    isActive ? "bg-gray-800 text-blue-400 font-semibold" : "hover:bg-gray-800 hover:text-blue-400"
                                }`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                    <button
                        className="flex items-center gap-3 p-3 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-red-400 transition-colors w-full text-left"
                        onClick={() => alert("Logout clicked")}
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Mobile Drawer Sidebar */}
            {open && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black/60"
                        onClick={() => setOpen(false)}
                    ></div>
                    <div className="relative w-64 bg-gray-900 text-gray-200 p-6 transform transition-transform duration-300 ease-in-out"
                         style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}>
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-gray-100"
                        >
                            <FaTimes size={18} />
                        </button>

                        <div className="flex flex-col items-center mt-6">
                            <img className="w-16 h-16 rounded-full border border-gray-700" src="" alt="" />
                            <p className="mt-2 text-gray-300 font-semibold">{username}</p>
                        </div>

                        <nav className="mt-8 space-y-2">
                            {links.map((item, i) => (
                                <NavLink
                                    key={i}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                            isActive ? "bg-gray-800 text-blue-400 font-semibold" : "hover:bg-gray-800 hover:text-blue-400"
                                        }`
                                    }
                                >
                                    {item.icon}
                                    {item.label}
                                </NavLink>
                            ))}
                            <button
                                className="flex items-center gap-3 p-3 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-red-400 transition-colors w-full text-left mt-4"
                                onClick={() => { setOpen(false); alert("Logout clicked"); }}
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
