import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const EditUsersTable = () => {
    const {id} = useParams()
    const Navigate = useNavigate()
    const [userdata, setUserdata] = useState({
        name: "",
        username: "",
        email: "",
        address: {
            city: "",
        }
    })

    const handlesubmit = ()=>{
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                setTimeout(()=>{
                    Navigate("/")
                }, 1000)
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const handleBack = ()=>{
        Navigate("/")
    }

    useEffect(() => {
        const fetchEditdata = ()=>{
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res=>{
                setUserdata({
                    name:res.data.name,
                    username: res.data.username,
                    email: res.data.email,
                    address: {
                        city: res.data.address.city,
                    }
                })
            })
        }
        fetchEditdata()
    }, []);

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-gray-900 rounded-xl shadow-lg text-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Edit User</h2>
            <form className="space-y-5">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userdata.username}
                    onChange={(e)=> setUserdata({...userdata , username: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userdata.name}
                    onChange={(e)=> setUserdata({...userdata , name: e.target.value})}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userdata.email}
                    onChange={(e)=> setUserdata({...userdata , email: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-700 bg-gray-800 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userdata.address.city}
                    onChange={(e)=> setUserdata({...userdata , address: {...userdata.address, city: e.target.value}})}
                />

                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                        onClick={handleBack}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={handlesubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditUsersTable;
