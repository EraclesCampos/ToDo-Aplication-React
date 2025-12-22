import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'

export function AddTareaForm({isOpenFormAdd, setTasks, onClose}) {
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(isOpenFormAdd)

    useEffect(() => {
        if (isOpenFormAdd) setVisible(true)
        else setTimeout(() => setVisible(false), 250)
        setError(false)
        
    }, [isOpenFormAdd])

    if (!visible) return null;

    const handleSubmit = (e)=>{
        e.preventDefault()
        const input = document.getElementById('add-input')
        const textarea = document.getElementById('descripcion-input')
        const dateInput = document.getElementById('date-input')
        const remeberOnceADay = document.getElementById('checkbox')
        if(!input.value.trim()){
            setError(true)
            return;
        }
        const tarea = {
            id: Date.now(),
            title: input.value.trim(),
            description: textarea.value.trim(),
            date: dateInput.value,
            rememberOnceADay: remeberOnceADay.checked,
            completed: false,
            lastNotified: null,
        }
        const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
        tasks.push(tarea)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        setTasks(tasks)
        input.value = ''
        textarea.value = ''
        dateInput.value = ''
        closeModal()
    }

    const closeModal = ()=>{
        onClose()
        setError(false)
    }
    
    return (
        <div className={`add-modal modal showed ${isOpenFormAdd ? 'bg-modal-entered' : 'bg-modal-leaving'}`} onClick={onClose}>
            <form className={`form-modal-container ${isOpenFormAdd ? 'modal-entered' : 'modal-leaving'}`} onClick={(e) => e.stopPropagation()}>
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
                <div className='flex-row'>
                    <label htmlFor="checkbox">Recordar una vez al dia</label>
                    <input type="checkbox" name="" id="checkbox" />
                </div>
                <div className="btns-form">
                    <input type="button" value="Cancelar" className="cancelForm" onClick={closeModal}/>
                    <input type="submit" value="Agregar" className="addForm" onClick={handleSubmit}/>
                </div>
            </form>       
        </div>
    )
}
