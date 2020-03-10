import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {format} from 'timeago.js'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import {Link} from 'react-router-dom'

export default class NoteList extends Component {
    constructor(props){
        super(props);

        this.state={
            notes:[]
        }
    }
    componentDidMount= async()=>{   
        this.mostrarNotas();
    }
    mostrarNotas = async() =>{
        const notes = await axios.get('http://localhost:4000/api/notes');
        this.setState({notes:notes.data});
    }
    eliminarNota = async(id) =>{
        await axios.delete('http://localhost:4000/api/notes/'+id);
        ToastsStore.error("Nota eliminada");
        this.mostrarNotas();
    }
    render() {
        return (
            <div>
                <ToastsContainer store={ToastsStore} className='luz' />
                <h4 className="text-center font-weight-bold mt-3 mb-3">Notas</h4>
                <div className="row">
                    {
                         this.state.notes.map(note =>(
                             <div className="col-md-4 p-2" key={note._id}>
                                 <div className="card">
                                     <div className="card-header bg-warning">
                                         <h6 className="text-center font-weight-bold">{note.titulo}</h6>
                                     </div>
                                     <div className="card-body justify-content">
                                        <p>{note.descripcion}</p>
                                        <hr/>
                                        <p className="text-warning font-weight-bold text-center">{note.autor} - <span className="text-dark"> {format(note.date)} </span></p>
                                     </div>
                                     <div className="card-footer bg-dark text-center">
                                        <button className="btn btn-danger m-1 font-weight-bold" onClick={()=>this.eliminarNota(note._id)}>
                                            Eliminar
                                        </button>
                                        <Link className="btn btn-warning m-1 font-weight-bold" to={"/edit/"+note._id} >
                                            Editar
                                        </Link>
                                     </div>
                                 </div>
                             </div>
                         ))
                    }
                </div>
            </div>
        )
    }
}
