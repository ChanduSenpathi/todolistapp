import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid';
import  {FaPencilAlt, FaRegTrashAlt}  from "react-icons/fa"
import "./todo.css"


export default function Todoapp() {
    const [btnTextstatus, setbtnStatus]= useState({status: false, id:""});
    const [taskName, setTaskname]= useState("");
    const [taskList, setTasklist]= useState([]);
    const [msg, setMsg]= useState("");

    useEffect(()=>{
        if(taskList.length===0){
            setMsg("No active Tasks")
        }else {
            setMsg("");
        }
    },[taskList])


    const userInputField = (event) =>{
        setTaskname(event.target.value);
    }

    const submitFormInputs =(event) => {
        event.preventDefault();
        if(btnTextstatus.status===false) {
            setTasklist([...taskList, {taskName, id:uuid()}]);
            setTaskname("");
        }else {
           let updatedList= taskList.map(item=>{
                if(item.id===btnTextstatus.id){

                    return ({...item, taskName})
                }
                return item
            });

            setTasklist(updatedList);
            setbtnStatus({status:false, id:""});
            setTaskname("");
        }
    }

    const onChangeEdit = (id) => {
        taskList.map(item => {
            if(item.id===id){
                setTaskname(item.taskName)
                console.log(item.taskName);
            }
        })
        setbtnStatus({status:true, id:id});
    }

    const onDeleteTask= (id) => {
        let updatedList =taskList.filter(item=> item.id!==id)
        setTasklist(updatedList);
    }


    let btnText= btnTextstatus.status ? "Update task" : "Add task";
  return (
    <section>
        <h1 className='text-center stroke-black stroke-2 font-bold'>Todo App</h1>
        <div className='flex justify-around items-center flex-wrap'>
            <form onSubmit={submitFormInputs}  className='sticky'>
                <input name='task' type='text' className='border-2 border-red-600 px-1 focus:ring-2 rounded-md' value={taskName} onChange={userInputField} placeholder='Enter task here'/>
                <button type='submit' className='bg-black text-green-500 px-3 m-3 rounded-sm rounded-md rounded-lg'>{btnText}</button>
            </form>
            <ul className='flex flex-col '>
                {taskList.map(item=>[
                    <li key={item.id} className='flex justify-between items-center'>
                        <h3 className='max-w-[300px]'>{item.taskName}</h3>
                        <div className='flex'>
                            <FaPencilAlt className='m-2 cursor-pointer' onClick={()=> onChangeEdit(item.id)}/>
                            <FaRegTrashAlt className='m-2 cursor-pointer' onClick={()=> onDeleteTask(item.id)}/>
                        </div>
                    </li>
                ])}
            </ul>
        </div>
        <p className='text-center mx-auto mt-4'>{msg}</p>
    </section>
  )
}
