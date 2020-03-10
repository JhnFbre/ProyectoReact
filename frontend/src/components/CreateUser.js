import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastsContainer, ToastsStore } from 'react-toasts';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = { users: [], username: '', rol: '', ide: '', estadoBtn: 'Limpiar', estadoBtn2: 'Enviar', estadoTx: 'Nuevo usuario', estadoAction: true };
    }
    resetForm = () => {
        this.setState({ username: '' });
        this.setState({ rol: '' });
        this.setState({ ide: '' });
        if (!this.state.estadoAction) {
            this.setState({ estadoBtn: 'Limpiar', estadoBtn2: 'Enviar', estadoTx: 'Nuevo usuario', estadoAction: true });
        }
    }
    componentDidMount() {
        //Ayuda a ejecutar codigo una vez que el codigo haya sido montado
        //Ayuda a hacer peticiones una vez que los elementos esten en pantalla
        //Se puede usar fetch o axios
        this.getUsuarios();
    }
    async getUsuarios() {
        const usuarios = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: usuarios.data });
    }
    onChangeUserName = (e) => { //Se ubica asi para evitar poner un bind dentro del codigo jsx
        this.setState({
            username: e.target.value
        });
    }
    editarUsuario = async (id, username, rol) => {
        this.setState({ username: username, rol: rol, ide: id, estadoBtn: 'Cancelar', estadoBtn2: 'Actualizar', estadoTx: 'Editar usuario' });
        this.setState({ estadoAction: false });
    }
    borrarUsuario = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id);
        this.borrarNotasByUsers(this.state.username);
        ToastsStore.error("Usuario Borrado");
        this.getUsuarios();
    }
    borrarNotasByUsers = async(id) =>{
        await axios.delete('http://localhost:4000/api/notes/deleteByUser/' + id)
    }
    onChangeUserRol = (e) => {
        this.setState({
            rol: e.target.value
        });
    }
    actualizarUsuario = async() => {
        await axios.put('http://localhost:4000/api/users/'+this.state.ide, {
            username: this.state.username,
            rol: this.state.rol
        });        
        this.getUsuarios();
        ToastsStore.warning("Usuario actualizado");
    }
    enviarUsuario = async e => {
        e.preventDefault();
        if (!this.state.estadoAction) {
            this.actualizarUsuario();
        } else {
            if (this.state.username === '' || this.state.rol === '') {
                ToastsStore.error("Llenar formulario");
            } else {
                await axios.post('http://localhost:4000/api/users', {
                    username: this.state.username,
                    rol: this.state.rol
                });
                ToastsStore.success("Usuario creado");
            }
        }                
        this.resetForm();
        this.getUsuarios();
    }

    render() {
        return (
            <div className="container">
                <ToastsContainer store={ToastsStore} className='luz' />
                <h3 className="text-center mt-3 mb-3 font-weight-bold">Crear Usuarios</h3>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-body">
                            <h5 className="font-weight-bold mb-4">{this.state.estadoTx}</h5>
                            <form onSubmit={this.enviarUsuario}>
                                <div className="form-group">
                                    <input className="form-control" value={this.state.username} placeholder="Username" onChange={this.onChangeUserName} type="text" name="username" id="username" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" value={this.state.rol} placeholder="Rol" onChange={this.onChangeUserRol} type="text" name="rol" id="rol" />
                                </div>
                                <div className="form-group text-center">
                                    <button type="button" onClick={this.resetForm} className="btn btn-primary text-light mr-1"> <b>{this.state.estadoBtn}</b></button>
                                    <button type="submit" className="btn btn-warning text-dark ml-1"> <b>{this.state.estadoBtn2}</b></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <ul className="list-group">
                            {
                                this.state.users.map(user => (
                                    <li className="list-group-item list-group-item-action" key={user._id}>
                                        {user.username} - <b>{user.rol}</b>
                                        <div className="float-right siteIcons">
                                            <div className="editItem" onDoubleClick={() => this.editarUsuario(user._id, user.username, user.rol)}>
                                                <svg className="svg-icon2" viewBox="0 0 20 20">
                                                    <path fill="none" d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"></path>
                                                </svg>
                                            </div>
                                            <div className="deleteItem" onDoubleClick={() => this.borrarUsuario(user._id)}>
                                                <svg className="svg-icon3" viewBox="0 0 20 20">
                                                    <path fill="none" d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08 c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469 c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304 c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </li>))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
