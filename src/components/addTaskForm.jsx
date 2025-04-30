import React from 'react'
import { useState } from 'react'
import '../App.css'

export function AddTareaForm({isOpenFormAdd, setIsOpenFormAdd, setTasks}) {
    const [error, setError] = useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault()
        const input = document.getElementById('add-input')
        const textarea = document.getElementById('descripcion-input')
        const dateInput = document.getElementById('date-input')
        if(!input.value){
            setError(true)
            return
        }
        const tarea = {
        id: Date.now(),
        title: input.value,
        description: textarea.value,
        date: dateInput.value
        }
        setTasks(tareas => [...tareas, tarea])
        input.value = ''
        textarea.value = ''
        dateInput.value = ''
        setIsOpenFormAdd(false)
        console.log(tarea)
    }

    const closeModal = () => {
        setIsOpenFormAdd(false)
    }
    
    return (
        <div className="add-modal modal showed">
            <form className="form-modal-container modal-animation">
                <h2>Agregar nueva tarea</h2>
                <div>
                    <label htmlFor="add-input">Titulo</label>
                    <input type="text" name="" id="add-input" className="data-form" autoComplete="off" required />
                    {error && <p className='error'>Campo obligatorio</p>}
                </div>
                <div>
                    <label htmlFor="descripcion-input">Descripcion</label>
                    <textarea name="" id="descripcion-input"className="data-form" ></textarea>
                </div>
                <div>
                    <label htmlFor="date-input">Agregar recordatorio</label>
                    <input type="datetime-local" name="" id="date-input"className="data-form" min="" />
                </div>
                <div className="btns-form">
                    <input type="button" value="Cancelar" className="cancelForm" onClick={closeModal}/>
                    <input type="submit" value="Agregar" className="addForm" onClick={handleSubmit}/>
                </div>
            </form>
        </div>
    )
}
