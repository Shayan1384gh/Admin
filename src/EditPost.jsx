import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditPost = ()=>{
    const {id} = useParams()
    const Navigate = useNavigate();
    const [post , setPost] = useState({
        title: "",
        body: "",
    })

    const submitpost = ()=>{
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
                    Navigate("/Posts")
                }, 1000)
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const handleBack = ()=>{
        Navigate("/Posts")
    }

    useEffect(() => {
        const fetchdata = ()=>{
            axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res=>{
                setPost({
                    title: res.data.title,
                    body: res.data.body,
                })
            })
        }
        fetchdata()
    }, []);
    return (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-xl w-full mx-auto mt-8 space-y-6 text-gray-200">
            <h2 className="text-xl font-semibold text-white">Edit Post</h2>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                    type="text"
                    placeholder="Enter post title"
                    className="w-full border border-gray-700 bg-gray-800 px-4 py-3 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={post.title}
                    onChange={(e)=> setPost({...post , title: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                    placeholder="Enter post description"
                    rows="4"
                    className="w-full border border-gray-700 bg-gray-800 px-4 py-3 rounded-lg resize-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={post.body}
                    onChange={(e)=> setPost({...post , body: e.target.value})}
                ></textarea>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={handleBack}
                    className="px-5 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={submitpost}
                    className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditPost;
