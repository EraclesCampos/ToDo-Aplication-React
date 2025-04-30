import React, { useEffect, useState } from 'react'
import '../App.css'

export function EditTaskForm({isOpenFormEdit, setIsOpenFormEdit, setTasks, tasks, idTaskEdit}) {
    const [input, setInput] = useState('')
    const [textarea, setTextarea] = useState('')
    const [dateInput, setDateInput] = useState('')
    const [error, setError] = useState(false)
    
    useEffect(() => {
        const index = tasks.findIndex(task => task.id === idTaskEdit)
        const taskToEdit = tasks[index]
        if(!taskToEdit) return 

        setInput(taskToEdit.title)
        setTextarea(taskToEdit.description)
        setDateInput(taskToEdit.date)
    }
    , [idTaskEdit, tasks])
  
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!input){
            setError(true)
            return
        }
        const tarea = {
            id: Date.now(),
            title: input,
            description: textarea,
            date: dateInput
        }
        const index = tasks.findIndex(task => task.id === idTaskEdit)
        const newTasks = [...tasks]
        newTasks[index] = tarea
        setTasks(newTasks)

        setInput('')
        setTextarea('')
        setDateInput('')
        setIsOpenFormEdit(false)
        console.log(tarea)
    }
  
    const closeModal = () => {
        setIsOpenFormEdit(false)
    }
    return (
      <div className="edit-modal modal showed">
          <form className="form-modal-container edit-form modal-animation">
              <h2>Editar tarea</h2>
              <div>
                  <label htmlFor="add-input">Titulo</label>
                  <input type="text" name="" id="add-input-edit" className="data-form" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" required/>
                  {error && <p className='error'>Campo obligatorio</p>}
              </div>
              <div>
                  <label htmlFor="descripcion-input">Descripcion</label>
                  <textarea name="" id="descripcion-input-edit"className="data-form" value={textarea} onChange={(e) => setTextarea(e.target.value)}></textarea>
              </div>
              <div>
                  <label htmlFor="date-input">Agregar recordatorio</label>
                  <input type="datetime-local" name="" id="date-input-edit" className="data-form" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
              </div>
              <div className="btns-form">
                  <input type="button" value="Cancelar" className="cancelForm" onClick={closeModal}/>
                  <input type="submit" value="Aceptar" className="addForm" onClick={handleSubmit}/>
              </div>
          </form>
      </div>
    )
  }