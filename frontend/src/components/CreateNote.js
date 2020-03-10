import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { ToastsContainer, ToastsStore } from 'react-toasts';

export default class CreateNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            userSelected: '',
            titulo: '',
            descripcion: '',
            date: new Date(),
            editing: false,
            _id: '',
            tx: 'Crear Notas',
            btnTx: 'Guardar'
        };
    }
    async componentDidMount() {
        const usuarios = await axios.get("http://localhost:4000/api/users");
        if (usuarios.data.length > 0) {
            this.setState({
                users: usuarios.data.map(user => user.username),
                userSelected: usuarios.data[0].username
            });
        }
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            this.setState({
                titulo: res.data.titulo,
                descripcion: res.data.descripcion,
                date: new Date(res.data.date),
                userSelected: res.data.autor,
                _id: res.data._id,
                editing: true,
                tx:'Editar Nota',
                btnTx:'Actualizar'
            });
        }

    }
    limpiarFormulario = () => {
        this.setState({
            titulo: '',
            descripcion: ''
        });
    }
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    enviarNota = async (e) => {
        e.preventDefault();
        if (this.state.titulo === '' || this.state.descripcion === '') {
            ToastsStore.error("Rellenar formulario")
        }
        else {
            if (this.state.editing) {       
                const notaActualizada = {
                    titulo: this.state.titulo,
                    descripcion: this.state.descripcion,
                    date: this.state.date,
                    autor: this.state.userSelected
                };
                await axios.put("http://localhost:4000/api/notes/" + this.state._id, notaActualizada);
                ToastsStore.warning("Nota Actualizada");  
            } else {
                const nuevaNota = {
                    titulo: this.state.titulo,
                    descripcion: this.state.descripcion,
                    autor: this.state.userSelected,
                    date: this.state.date
                }
                ToastsStore.success("Nota creada");
                await axios.post("http://localhost:4000/api/notes", nuevaNota);
            }
            
        }
        setTimeout(() => {
            this.props.history.push('/');
        }, 1000);
    }
    onChangeDate = date => {
        this.setState({ date });
    }
    render() {
        return (
            <div>
                <ToastsContainer store={ToastsStore} className='luz' />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card-header bg-warning  mt-3">
                                <h3 className="text-center font-weight-bold">{this.state.tx}</h3>
                            </div>
                            <div className="card card-body">
                                <form onSubmit={this.enviarNota}>
                                    <div className="form-group">
                                        <input type="text" name="titulo" onChange={this.onInputChange} value={this.state.titulo} className="form-control" placeholder="Titulo" id="" />
                                    </div>
                                    <div className="form-group">
                                        <textarea name="descripcion" onChange={this.onInputChange} value={this.state.descripcion} className="form-control" placeholder="Descripcion" id="" />
                                    </div>
                                    {/*--Select de usuarios--*/}
                                    <div className="form-group">
                                        <select
                                            name="userSelected"
                                            value={this.state.userSelected}
                                            onChange={this.onInputChange}
                                            id="" className="form-control">
                                            {
                                                this.state.users.map(user => (
                                                    <option key={user} value={user}>{user}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form group text-center ">
                                        <DatePicker className="form-control"
                                            selected={this.state.date}
                                            onChange={this.onChangeDate}
                                        />
                                    </div>
                                    <div className="text-center form-group mt-3">
                                        <button type="submit" className="btn btn-warning font-weight-bold">{this.state.btnTx}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
