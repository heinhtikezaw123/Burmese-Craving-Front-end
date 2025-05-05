import React from 'react'

const ToDoItems = ({item}) => {
    return (

        <div 
            className="bg-blue-200 dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition space-y-2">

            <h3 className="text-xl font-bold">{item.projectTitle}</h3>
            <p className="text-sm dark:text-gray-400 mb-2">{item.createdAt}</p>
            <p className="text-lg font-semibold">{item.title}</p>


            <div className="text-sm  space-y-1">
                <p>
                    <span className="font-medium ">Assigned By:</span> {item.assignedBy || "Senior Leader"}
                </p>
                <p>
                    <span className="font-medium ">Assigned To:</span> {item.assignedTo || "Team Member"}
                </p>
                {item.dueDate && (
                    <p>
                        <span className="font-medium ">Due Date:</span> {item.dueDate || "12-Apr-2000 14:29"}
                    </p>
                )}
                {item.priority && (
                    <p>
                        <span className="font-medium ">Priority:</span>{" "}
                        <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${item.priority === "High"
                                ? "bg-red-600 text-white"
                                : item.priority === "Medium"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-green-600 text-white"
                                }`}
                        >
                            {item.priority}
                        </span>
                    </p>
                )}
                {item.status && (
                    <p>
                        <span className="font-medium ">Status:</span>{" "}
                        <span className="italic">{item.status}</span>
                    </p>
                )}
                <p>
                    <span className="font-medium ">Description:</span> {item.description}
                </p>
            </div>

            <div className="flex gap-2 pt-2">
                <button className="text-sm px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 transition">Edit</button>
                <button className="text-sm px-3 py-1 bg-green-600 rounded hover:bg-green-500 transition">Mark Done</button>
            </div>
        </div>)
}

export default ToDoItems