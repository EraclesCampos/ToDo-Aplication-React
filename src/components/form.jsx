import React, { useContext, useEffect, useRef, useState } from 'react'
import '../App.css'
import { useTasksFormContext } from '../Contexts/TaskFormContext'

export function Form(props){
    const {
        formValues,
        updateField,
        resetForm,
        mode,
    } = useTasksFormContext()
    const titleRef = useRef(null)

    useEffect(()=>{
        if(props.isOpenedForm){
            titleRef.current.focus()
        }
    }, [props.isOpenedForm])
    const handleSubmit = (e)=>{
        e.preventDefault()

        if(mode == 'create'){
            props.onSubmit(formValues)
        }
        else{
            props.onUpdate(formValues)
        }

        resetForm()
    }
    return (
        <div className={`modal showed ${props.isOpenedForm ? 'bg-modal-entered' : 'bg-modal-leaving'}`} onClick={props.onClose}>
            <form className={`form-modal-container ${props.isOpenedForm ? 'modal-entered' : 'modal-leaving'}`} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <h2>{mode === 'create' ? 'Agregar nueva tarea' : 'Editar tarea'}</h2>
                <div>
                    <label htmlFor="add-input">Titulo</label>
                    <input ref={titleRef} type="text" name="" id="add-input" className="data-form" autoComplete="off" value={formValues.title} onChange={(e) => updateField('title', e.target.value)} required />
                    {props.error && <p className='error'>Campo obligatorio</p>}
                </div>
                <div>
                    <label htmlFor="descripcion-input">Descripcion</label>
                    <textarea name="" id="descripcion-input"className="data-form" value={formValues.description} onChange={(e) => updateField('description', e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="date-input">Agregar recordatorio</label>
                    <input type="datetime-local" name="" id="date-input" className="data-form" min="" value={formValues.date} onChange={(e) => updateField('date', e.target.value)} />
                </div>
                <div className='flex-row'>
                    <label htmlFor="checkbox">Recordar una vez al dia</label>
                    <input type="checkbox" name="" id="checkbox" checked={formValues.rememberOnceADay} onChange={(e) => updateField('rememberOnceADay', e.target.checked)} />
                </div>
                <div className="btns-form">
                    <input type="button" value="Cancelar" className="cancelForm" onClick={() => props.onClose()}/>
                    <input type="submit" value={mode === 'create' ? 'Agregar' : 'Actualizar'} className="addForm"/>
                </div>
            </form>
        </div>
    )
}