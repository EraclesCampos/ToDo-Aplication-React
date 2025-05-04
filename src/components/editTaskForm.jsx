import React, { useEffect, useState } from 'react'
import '../App.css'

export function EditTaskForm({isOpenFormEdit, setTasks, tasks, idTaskEdit, onClose}) {
    const [input, setInput] = useState('')
    const [textarea, setTextarea] = useState('')
    const [dateInput, setDateInput] = useState('')
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(isOpenFormEdit)
    
    useEffect(() => {
        const index = tasks.findIndex(task => task.id === idTaskEdit)
        const taskToEdit = tasks[index]
        if(!taskToEdit) return 

        setInput(taskToEdit.title.trim())
        setTextarea(taskToEdit.description.trim())
        setDateInput(taskToEdit.date)
    }
    , [idTaskEdit, tasks, isOpenFormEdit])
    
    useEffect(() => {
        if (isOpenFormEdit) setVisible(true)
        else setTimeout(() => setVisible(false), 250)
        
    }, [isOpenFormEdit])

    if (!visible) return null;
    
  
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!input.trim()){
            setError(true)
            return
        }
        const tarea = {
            id: Date.now(),
            title: input,
            description: textarea,
            date: dateInput,
            completed: false,
        }
        const index = tasks.findIndex(task => task.id === idTaskEdit)
        const newTasks = [...tasks]
        newTasks[index] = tarea
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        setTasks(newTasks)

        setInput('')
        setTextarea('')
        setDateInput('')
        closeModal()
    }

    const closeModal = ()=>{
        onClose()
        setError(false)
    }

    return (
        <div className={`edit-modal modal showed ${isOpenFormEdit ? 'bg-modal-entered' : 'bg-modal-leaving'}`} onClick={onClose}>
          <form className={`form-modal-container edit-form ${isOpenFormEdit ? 'modal-entered' : 'modal-leaving'}`} onClick={(e) => e.stopPropagation()}>
              <h2>Editar tarea</h2>
              <div>
                  <label htmlFor="add-input-edit">Titulo</label>
                  <input type="text" name="" id="add-input-edit" className="data-form" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" required/>
                  {error && <p className='error'>Campo obligatorio</p>}
              </div>
              <div>
                  <label htmlFor="descripcion-input-edit">Descripcion</label>
                  <textarea name="" id="descripcion-input-edit"className="data-form" value={textarea} onChange={(e) => setTextarea(e.target.value)}></textarea>
              </div>
              <div>
                  <label htmlFor="date-input-edit">Agregar recordatorio</label>
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