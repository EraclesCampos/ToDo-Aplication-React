import React, { useEffect, useState } from 'react'
import '../App.css'

export function EditTaskForm({isOpenFormEdit, setTasks, tasks, idTaskEdit, onClose}) {
    const [input, setInput] = useState('')
    const [textarea, setTextarea] = useState('')
    const [dateInput, setDateInput] = useState('')
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(isOpenFormEdit)
    
    // console.log(isOpenFormEdit)
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
            date: dateInput
        }
        const index = tasks.findIndex(task => task.id === idTaskEdit)
        const newTasks = [...tasks]
        newTasks[index] = tarea
        setTasks(newTasks)

        setInput('')
        setTextarea('')
        setDateInput('')
        onClose()
        // console.log(tarea)
    }

    const closeModal = ()=>{
        onClose()
        setError(false)
    }

    return (
        <div className={`edit-modal modal showed ${isOpenFormEdit ? 'modal-animation-entered' : 'modal-animation-leaving'}`} onClick={onClose}>
          <form className="form-modal-container edit-form modal-animation" onClick={(e) => e.stopPropagation()}>
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