import {useState} from "react";


const Setting = ()=>{
    const [userName, setUsername] = useState(localStorage.getItem('userName' || "Admin"));
    const handleChangeName = (e)=>{
        const NewName = e.target.value
        setUsername(NewName);
        localStorage.setItem("userName" , NewName)
    }

    return(
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-white">Settings</h2>
            <div className="space-y-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-3 text-gray-300">Profile Settings</h3>
                    <div className="flex items-center gap-4">
                        <img className="w-12 h-12 rounded-full border border-gray-700" src="" alt="" />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Change Photo</button>
                    </div>
                    <input
                        type="text"
                        placeholder="Full Name ( just refresh the site after change your name )"
                        className="w-full mt-3 px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="Admin"
                        value={userName}
                        onChange={handleChangeName}
                    />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-3 text-gray-300">Notifications</h3>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                        <span className="text-gray-400">Enable Email Notifications</span>
                    </label>
                    <label className="flex items-center gap-2 mt-2">
                        <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                        <span className="text-gray-400">Enable Push Notifications</span>
                    </label>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-3 text-gray-300">Security</h3>
                    <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Update Password</button>
                </div>
            </div>
        </div>
    )
}

export default Setting