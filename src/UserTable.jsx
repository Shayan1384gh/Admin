import {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {Link} from "react-router";

export default function UserTable() {
    const [Users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [Error , setError] = useState("")

    useEffect(() => {
        const fetchdata = ()=>{
            setLoading(true)
            setTimeout(()=>{
                axios.get("https://jsonplaceholder.typicode.com/users").then(res=>{
                    setUsers(res.data)
                    setLoading(false)
                }).catch(err=>{
                    setError("Something went wrong!")
                })
            } , 1000)
        }
        fetchdata()
    }, [])

    const DeleteItem = (ItemId)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                let DeleteUser = Users.filter(t=>t.id !== ItemId)
                setUsers(DeleteUser)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    return (
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full overflow-x-auto text-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-white">Users Management</h2>
            <h2 className="text-xl font-semibold mb-6 text-gray-300">Users</h2>
            {loading && (
                <p className="text-blue-400 font-medium animate-pulse mb-6">
                    Please wait …
                </p>
            )}
            {Error && (
                <p className="text-red-500 font-semibold mb-6">
                    {Error}
                </p>
            )}
            <table className="w-full table-auto text-left text-sm border border-gray-700 rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-gray-800 text-gray-300">
                    <th className="p-4 whitespace-nowrap">#</th>
                    <th className="p-4 whitespace-nowrap">Name</th>
                    <th className="p-4 whitespace-nowrap">Email</th>
                    <th className="p-4 whitespace-nowrap">Actions</th>
                </tr>
                </thead>
                <tbody>
                {Users.map((user) => (
                    <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-800 transition-colors">
                        <td className="p-4">{user.id}</td>
                        <td className="p-4">{user.name}</td>
                        <td className="p-4 break-all">{user.email}</td>
                        <td className="p-4 space-x-3">
                            <Link to={`/EditUser/${user.id}`}>
                                <button className="text-yellow-400 hover:text-yellow-300 transition-colors">Edit</button>
                            </Link>
                            <button onClick={() => DeleteItem(user.id)}
                                    className="text-red-400 hover:text-red-300 transition-colors">Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
