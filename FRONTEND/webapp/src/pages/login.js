import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const baseUrl = "http://34.72.134.119:3200/usuarios";
const styles = {
    textalign: "center",
    background: "rgb(79,118,62)",
    bordercolor: "rgba(33,37,41,0)"
};

const navstyle = {
    color: "rgb(255,255,255)",
    background: "linear-gradient(91deg, rgb(51,166,55), rgb(30,156,73) 51%, rgb(1,200,116))",
    fontsize: '20px'
}

class login extends Component {
    state={
        form:{
            username:'',
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


    entrar=async()=>{
        let si = false;
        await Axios.get(baseUrl,{params: {username:this.state.form.username,password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                for (let index = 0; index < response.length; index++) {
                    const element = response[index];
                    if(element.username === this.state.form.username && element.password === md5(this.state.form.password)){
                        var respuesta = response[index];
                        cookies.set('username',respuesta.username,{path:"/"});
                        alert(`Bienvenido ${respuesta.username}`);
                        window.location.href="./principal";
                        si = true;
                    }
                }
                if(!si){
                    alert('El usuario o la clave no son correctas')
                }
            }else{
                alert('El usuario o la clave no son correctas')
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    registrar(){
        window.location.href="./registro";
    }

    componentDidMount() {
        if(cookies.get('username')){
            window.location.href = "./principal";
        }
    }
    

    render() {
        return (
            <div style={{backgroundColor: styles.background,borderColor:styles.bordercolor,textAlign:styles.textAlign}}>
                <nav class="navbar navbar-light navbar-expand-md" style={{color: navstyle.color,background:navstyle.background, fontSize:navstyle.fontsize}}>
                    <div class="container-fluid"><a class="navbar-brand" href="#">Posts</a><button data-toggle="collapse" data-target="#navcol-1" class="navbar-toggler"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                        <div class="collapse navbar-collapse"
                            id="navcol-1">
                            <ul class="nav navbar-nav">
                                <li class="nav-item"><a class="nav-link active" href="#"></a></li>
                                <li class="nav-item"><a class="nav-link" href="#"></a></li>
                                <li class="nav-item"><a class="nav-link" href="#">Informacion</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="container" style={{textAlign: "center",margin: "200px"}}>
                    <div class="card" style={{width: '531px',margin: '200px',textAlign: 'center',borderRadius: '27px',padding: '0px'}}>
                        <div class="card-body">
                            <h4 class="card-title">INICIAR SESION</h4>
                            <h6 class="text-muted card-subtitle mb-2">Bienvenido</h6>
                            <div class="row" style={{padding:'14px'}}>
                                <div class="col"><input type="text" name="username"  className="form-control" placeholder="Nombre de usuario" onChange={this.handleChange} /></div>
                                <div class="col"><input type="password" name="password" className="form-control" placeholder="Enter password" onChange={this.handleChange}/></div>
                            </div>
                            <div class="row">
                                <div class="col offset-md-0" style={{textAlign: 'center'}}><button class="btn btn-primary" onClick={()=>this.entrar()} type="button" style={{background: "#006b3f"}}>Ingresar</button></div>
                                <div class="col offset-md-0" style={{textAlign: 'center'}}><button class="btn btn-primary" onClick={()=>this.registrar()} type="button" style={{background: "#998e07",borderStyle:"none"}}>Registrarse</button></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr></hr>
                    </div>
                </div>
            </div>
        );
    }
}

export default login;

