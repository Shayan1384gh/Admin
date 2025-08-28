import {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import {Link} from "react-router";

export default function PostManager() {
    const [postdata , setPostdata] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const perpage = 5
    const [description, setdescription] = useState([])
    const [task, setTask] = useState([])

    const AddPost = () => {
        const newPost = {
            id: postdata.length + 1,
            title: task,
            body:description,
        }
        setPostdata([...postdata , newPost])
        setTask("")
        setdescription("")

    }

    const DeletePost = (ItemId) => {
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
                let DeleteItem = postdata.filter(t=>t.id !== ItemId)
                setPostdata(DeleteItem)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const start = (page - 1) * perpage
    const end = start + perpage
    const currrentpost = postdata.slice(start , end)

    useEffect(() => {
        const fetchpostdata = ()=>{
            setLoading(true)
            setTimeout(()=>{
                axios.get("https://jsonplaceholder.typicode.com/posts").then(res=>{
                    setPostdata(res.data)
                    setLoading(false)
                }).catch(err=>{
                    setError("Something went wrong!")
                })
            } , 1000)
        }
        fetchpostdata()
    }, [])
    return (
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-8 text-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-white">Post Management</h2>

            <div className="flex flex-col gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter post title"
                    className="flex-1 border border-gray-700 bg-gray-800 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={task}
                    onChange={(e)=>setTask(e.target.value)}
                />
                <textarea
                    placeholder="Enter post description"
                    className="w-full border border-gray-700 bg-gray-800 rounded-lg p-4 resize-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                    rows={4}
                    value={description}
                    onChange={(e)=>setdescription(e.target.value)}
                />

                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
                        onClick={AddPost}>
                    Add Post
                </button>
            </div>
            {loading && (
                <p className="text-blue-400 font-medium animate-pulse mb-6">
                    Please wait …
                </p>
            )}
            {error && (
                <p className="text-red-500 font-semibold mb-6">
                    {error}
                </p>
            )}
            <div className="space-y-4">
                {currrentpost.map(post => (
                    <div key={post.id} className="bg-gray-800 p-5 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-100">{post.title}</h3>
                            <p className="text-sm text-gray-400 mt-1">{post.body}</p>
                        </div>
                        <div className="flex gap-4 mt-2 sm:mt-0">
                            <Link to={`/EditPost/${post.id}`}>
                                <button className="text-yellow-400 hover:text-yellow-300 transition-colors">Edit</button>
                            </Link>
                            <button onClick={()=>DeletePost(post.id)} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                        </div>
                    </div>
                ))}
                <div className="flex gap-3 justify-center mt-6">
                    <button
                        className="px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
                        onClick={()=>setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
                        onClick={()=>setPage(page + 1)}
                        disabled={page >= postdata.length / perpage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}