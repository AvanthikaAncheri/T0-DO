import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './Todo.css'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";


function Todo1() {
    const [todo, settodo] = useState("");
    const [todoarray, settodoarray] = useState([]);
    const [editId, seteditId] = useState(0)

    const addTodo = () => {
       if(todo !== ''){
        settodoarray([...todoarray,{list : todo, id : Date.now(), status : false}])
       console.log(todoarray)
       settodo('')
       }
       if(editId){
        const editTodo = todoarray.find((todo)=>todo.id == editId)
        const updateTodo = todoarray.map((todo1)=>todo1.id === editTodo.id
         ? (todo1 = {id: todo1.id, list : todo}) : (todo1 = {id : todo1.id, list: todo1.list}))
         settodoarray(updateTodo)
         seteditId(0);
         settodo('')
       }
    }

    const inputRef = useRef('null')
    useEffect(() => {
      inputRef.current.focus();
    
    });
    
    const onDelete = (id) => {
       settodoarray(todoarray.filter((todo1) => todo1.id !== id))
    }
    const onComplete = (id) => {
      let complete = todoarray.map((list)=>{
        if(list.id === id){
          return({...list, status : !list.status})
        }
        return list
      })
      settodoarray(complete)
   }
    
   const onEdit = (id) => {
      const edittodo = todoarray.find((todo1)=> todo1.id === id)
      settodo(edittodo.list)
      seteditId(edittodo.id)
   }
   
    const handleSubmit = (e) => {
      e.preventDefault();
    }



  return (
    <div className='container'>
        <h2>TODO APP</h2>
        <Form onSubmit={handleSubmit}>
           <Form.Control type="text" value={todo} ref={inputRef} placeholder="Enter your To-do" onChange={(event)=>settodo(event.target.value)}/>
           <button onClick={addTodo}>{editId ? 'EDIT':'ADD'}</button>
        </Form>
        <div className='list'>
            <ul> 
                {
                  todoarray.map((todo1)=>(
                    <li className='form-control' id='list-item'><span className='list-item-list' id={todo1.status ? 'list1' : ''}>{todo1.list}</span>
                     <span>
                      <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={()=>onComplete(todo1.id)}/>
                      <FiEdit className='list-item-icons' id='edit' title='Edit' onClick={()=>onEdit(todo1.id)}/>
                      <MdDelete className='list-item-icons' id='delete' title='Delete' onClick={()=>onDelete(todo1.id)}/>
                     </span>
                    </li>
                  ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Todo1