import React, { Component} from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios'

const cookies = new Cookies();

class principal extends Component {

    constructor(){
        super();
        this.state = {
            imagenes:[],
            mensajes:[],
            texto:''
        };
    }

    handleChange = async e=>{
        await this.setState({
            texto:{
                ...this.state.texto,
                [e.target.name]: e.target.value
            }
        })
    }

    cerrarSesion=()=>{
        cookies.remove('username',{path:"/"});
        window.location.href='./';
    }

    dataHandler=()=>{
        fetch('http://34.72.134.119:3200/mensajes',{
            method: 'GET',
        })
        .then((response)=>response.json())
        .then((json)=>{
            if(this.state.mensajes.length != json.length){
            this.setState({mensajes:json})
        }
        })
    }
    
    UdataHandler=()=>{
        fetch('http://34.72.134.119:3200/mensajes',{
            method: 'GET',
        })
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({mensajes:json})
        })
    }

    componentDidMount() {
        Axios.get('https://tinyfac.es/api/users')
        .then(response =>{
            this.setState({imagenes:response.data})
        })
        .catch(err=>{
            throw Error(err.message);
        });
        if(!cookies.get('username')){
            window.location.href = "./";
        }

        setInterval(() => {
            this.dataHandler();
        }, 1000);
    }

    publicar(){
        const requestOptions = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({nombre:cookies.get('username'),mensaje:this.state.texto.texto}) 
        };
        fetch('http://34.72.134.119:3200/nuevo',requestOptions)
        .then(response =>{ 
        })
        .catch(err=>{
            throw Error(err.message);
        });
    }

    like(nombre,mensaje){
        const requestOptions = {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({user:nombre,mensaje:mensaje})
        };
        fetch('http://34.72.134.119:3200/newlike',requestOptions)
        .then(response =>{ 
            this.UdataHandler();
        })
        .catch(err=>{
            throw Error(err.message);
        });

    }
    
getimagen(){
    if(this.state.imagenes.length>0){
        return this.state.imagenes[0].avatars[0].url
    }
    return null
}

getRandomimagen(nombre){
    if(this.state.imagenes.length>0){
        if(cookies.get('username')==nombre){
            return this.state.imagenes[0].avatars[0].url;
        }else{
        var x = Math.floor(Math.random() * (this.state.imagenes.length-1))+1;
        return this.state.imagenes[x].avatars[0].url
    }
    }
    return null
}

    render() {
        return (
            <div style={{background: 'linear-gradient(-41deg, #024930, #006847 17%, #007c59 37%, #00b27a 62%, #00c993)'}}>
                <nav class="navbar navbar-light navbar-expand-md">
                    <div class="container-fluid"><a class="navbar-brand">Bienvenido</a><button data-toggle="collapse" data-target="#navcol-1" class="navbar-toggler"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                        <div class="collapse navbar-collapse"
                            id="navcol-1">
                            <ul class="nav navbar-nav">
                                <li class="nav-item"><a class="nav-link active">{cookies.get('username')}</a></li>
                            </ul><span class="navbar-text" style={{width: '373px'}}><img width="50" height="50" src={this.getimagen()} /></span><button class="btn btn-primary" type="button" onClick={()=>this.cerrarSesion()} style={{background: '#913338',borderStyle: 'none'}}>Cerrar Sesion</button></div>
                    </div>
                </nav>
                <div>
                    <h1>Que quieres decir hoy?</h1>
                    <div class="card" style={{width: '478px',margin: '18px',padding: '0px'}}>
                        <div class="card-body">
                            <h4 class="card-title">Nueva publicacion</h4>
                            <h6 class="text-muted card-subtitle mb-2">Que estas pensando?</h6>
                            <textarea name="texto" onChange={this.handleChange} style={{margin: '15px',width: '385px',height: '89px'}}></textarea>
                            <button class="btn btn-primary"  onClick={()=>this.publicar()} type="button" style={{margin: '14px',width: '201px',borderStyle: 'none',background: '#28c4d8'}}>Publicar</button></div>
                    </div>
                </div>
                <div>
                    <h1>Publicaciones</h1>
                    {this.state.mensajes.map((registro)=>(
                        <div class="media"><img width="100" height="100" class="mr-3" src={this.getRandomimagen(registro.Usuario)} /><div class="media-body"><h5>{registro.Usuario}</h5><p>{registro.Mensaje}</p>
                        <button class="btn btn-danger" onClick={()=>this.like(registro.Usuario,registro.Mensaje)} type="button">Ly</button>
                    <p>a {registro.likes} personas les gusta esto</p>
                        <hr></hr></div></div>
                    ))}
                </div>
            </div>
        );
    }
}

export default principal;