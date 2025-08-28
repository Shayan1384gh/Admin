import {useState} from "react";
import Swal from 'sweetalert2';

export default function TodoWork() {
    const [input , setInput] = useState("")
    const [todos, setTodos] = useState([])

    const AddTodo = () => {
        let newTodo = {
            text: input,
            id: Date.now(),
        }
        setTodos([...todos, newTodo])
        setInput("")
    }

    const DeleteTodo = (Item) => {
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
                let Deleteitem = todos.filter(t=>t.id !== Item)
                setTodos(Deleteitem)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }
    return (
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto mt-8 text-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-white">Task Management</h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Add a new task"
                    className="flex-1 border border-gray-700 bg-gray-800 px-4 py-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                        onClick={AddTodo}>
                    Add Task
                </button>
            </div>

            <ul className="space-y-3">
                {todos.map(i => (
                    <li key={i.id} className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg shadow-sm">
                        <span>{i.text}</span>
                        <button className="text-red-400 hover:text-red-300 transition-colors" onClick={()=>DeleteTodo(i.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}