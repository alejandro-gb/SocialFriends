import React, { Component } from "react";
import './registro.css';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const baseUrl = "";



class SignUp extends Component {
state = {
    form:{
        nombre:'',
        password:''
    }
}

handleChange=async e=>{
    await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }
    })
}

registrarse(){
    var j =JSON.stringify({nombre:this.state.form.nombre, password:md5(this.state.form.password)}); 

    console.log(j); 

    const requestOptions = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({nombre:this.state.form.nombre,password:md5(this.state.form.password)})
    };
    fetch('http://34.72.134.119:3200/newuser',requestOptions)
    .then(response =>{ 
        cookies.set('username',this.state.form.nombre,{path:"/"});
        alert(`Bienvenido ${this.state.form.nombre} ahora podrar publicar y ver los mensajes de tus amigos`);
        window.location.href="./principal";
 })
    .catch(err=>{
        throw Error(err.message);
    });
}

//componentDidMount() {
//    if(cookies.get('username')){
//       window.location.href = "./principal";
//    }
//}

    render() {
        return (
            <body >
    <div class="login-dark">
            <h2>Registrate</h2>
            <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
            <div class="form-group"><input onChange={this.handleChange} type="text" class="form-control" name="nombre" placeholder="Nombre de usuario" /></div>
            <div class="form-group"><input onChange={this.handleChange} type="password" class="form-control" name="password" placeholder="Password" /></div>
            <div class="form-group"><button class="btn btn-primary btn-block"  onClick={()=>this.registrarse()}>Sign In</button></div>
    </div>
    <div></div>
</body>
        );
    }
}

export default SignUp;