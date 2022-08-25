import './Form.css';
import {BaseColaboradores} from '../../baseColaboradores.js';
import { useState } from 'react';

const Form = () => {

    const [nombreColaborador, setNombreColaborador] = useState("");
    const [correoColaborador, setCorreoColaborador] = useState("");
    const [datosColaboradores, setDatosColaboradores] = useState(BaseColaboradores);
    const [datosFiltrados, setDatosFiltrados] = useState(datosColaboradores);   
    const [errorDatos, setErrorDatos] = useState(false);
   
    // Funcion capturar informacion de los inputs
    const capturarNombre = (e) => {
        setNombreColaborador(e.target.value);
        console.log(e.target.value)
    }

    const capturarCorreo = (e) => {
        setCorreoColaborador(e.target.value);
        console.log(e.target.value);
    }
    
    // Funcion agregar datos colaborador 
    const agregarDatos = (e) => {
        e.preventDefault()

        if (nombreColaborador === "" || correoColaborador === "") {
            setErrorDatos(true);
            return
        }
        setErrorDatos(false);
        setDatosColaboradores([...datosColaboradores, {id: "Id del colaborador: " + (datosColaboradores.length+1), nombre: nombreColaborador, correo: correoColaborador}])
        setDatosFiltrados([...datosColaboradores, {id: "Id del colaborador: " + (datosColaboradores.length+1), nombre: nombreColaborador, correo: correoColaborador}])  
        setNombreColaborador("");
        setCorreoColaborador("");

        console.log(datosColaboradores) /*Por que no me agrega el último estado*/
    }    

    /* Barra de busqueda*/    

    const buscarNombre = (e) => {        
        
        console.log(e.target.value)
        setDatosFiltrados([...datosColaboradores.filter(nombreBuscado => nombreBuscado.nombre.toLowerCase().includes(e.target.value) )])
        console.log(datosFiltrados);
    }

    return (
        <><header className='header-section'>
            <div className="title-div">
                <h1 className='header-title'>Buscador de Colaboradores</h1>
            </div>
            <input type="search" name="datosBusqueda" 
             id="search-bar" 
            className='search-bar' placeholder='Buscar un colaborador' 
            onChange={buscarNombre}/>
        </header><><section className="input-section">
            <form className="colaborator-form" onSubmit={agregarDatos}>
                <label>Nombre del colaborador</label>
                <input name="nombreColaborador" value={nombreColaborador} className='data-input' type="text" placeholder='Escribir nombre del colaborador' onChange={capturarNombre} />
                <label htmlFor="">Correo del colaborador</label>
                <input name="correoColaborador" value={correoColaborador} className='data-input' type="text" placeholder='Escribir correo del colaborador' onChange={capturarCorreo} />
                <button className='agregar-button'>Agregar colaborador</button>
                {errorDatos ? <p className='error-datos'>Debes completar los datos necesarios para agregar colaborador.</p> : null}
            </form>
        </section><section className='lista-section'>
                    <div className='section-title-div'>
                        <h2 className='section-title'>Lista de colaboradores</h2>
                    </div>
                    <div className='lista-div'>
                        {datosFiltrados.map(datosPersonales => 
                        <div className='datos-colaborador'>
                            <li >{datosPersonales.id}</li>
                            <li key={datosPersonales.key}>{datosPersonales.nombre}</li>
                            <li >{datosPersonales.correo}</li>
                        </div>)}
                    </div>

                </section></></>
    )
}

export default Form;