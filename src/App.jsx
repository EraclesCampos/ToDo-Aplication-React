import { useState, useEffect } from 'react'
import './App.css'
import { AddTareaForm } from './components/addTaskForm'
import { EditTaskForm } from './components/editTaskForm'


function App() {
  const [tasks, setTasks] = useState([])
  // const [task, setTarea] = useState('')
  const [isOpenFormAdd, setIsOpenFormAdd] = useState(false)
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false)
  const [idTaskEdit, setIdTaskEdit] = useState(null)

  return (
    <>
      <div className="global-container">
        <img src="images/checked.png" alt="completadas" title="completadas" className="completadas" />
        <h1 className="title">Tu lista de tareas</h1>
        <div className="tareas-container">
            {tasks.length === 0 ? 
              <p>No hay tareas pendientes</p>
              :
             tasks.map((task, index) =>(
              <div className="tarea" key={index} data-id={task.id}>
                <div className="h3-container">
                    <h3>{task.title}</h3>
                </div>
                <div className="check-delete">
                    <button className='check' onClick="markCompleted(this)"><img src='images/check.png'/></button>   
                    <button className="delete" onClick="delTasks(this,false)"><img src='images/delete.png'/></button>
                    <button className='edit' onClick={()=>{setIdTaskEdit(task.id); setIsOpenFormEdit(!isOpenFormEdit)}}><img src='images/edit.png'/></button>
                    <button className="details" onClick="detailsTask(this)"><img src='images/info.png'/></button>
                    <input type="hidden" value={task.id} />
                </div>
              </div>
            ))}
        </div>
        <div className="add-container">
            <button className="add" title="agregar" onClick={()=>setIsOpenFormAdd(!isOpenFormAdd)}><img src="images/add.png" alt="agregar" /></button>
        </div>
      </div>
      <AddTareaForm isOpenFormAdd={isOpenFormAdd} setTasks={setTasks} onClose={()=>setIsOpenFormAdd(false)}/>
      <EditTaskForm isOpenFormEdit={isOpenFormEdit} setTasks={setTasks} tasks={tasks} idTaskEdit={idTaskEdit} onClose={()=>setIsOpenFormEdit(false)}/>
  
    </>
  )
}

export default App
