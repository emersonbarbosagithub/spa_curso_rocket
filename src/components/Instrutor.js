import React, { Component } from 'react';

class Instrutor extends Component {
    constructor() {
        super();
        this.state = {
            instrutores: [],
            select_instrutores: [],
            cursos: [],
            cadastrar: [0],
            cadastrarSucesso:[],
            curso_cadastro: []
        }
        this.pegaDados = this.pegaDados.bind(this)
        this.pegaDadosCursoId = this.pegaDadosCursoId.bind(this)
        this.cadastraInstrutor = this.cadastraInstrutor.bind(this)
        this.change = this.change.bind(this)
        this.input_name = this.input_name.bind(this)
        this.input_email = this.input_email.bind(this)
        this.input_curso = this.input_curso.bind(this)
    }

    change(event) {
        this.setState({curso_selecionado: event.target.value})
    }

    input_name(event_in) {
        this.setState({instrutor_input_name: event_in.target.value})
    }

    input_email(event_in) {
        this.setState({instrutor_input_email: event_in.target.value})
    }

    input_curso(event_in) {
        this.setState({instrutor_input_curso: event_in.target.value})        
    }

    componentDidMount() {
        fetch('mongodb://rocketdb:a123456@ds121652.mlab.com:21652/rocketdb/cursos/')
            .then(response => { return response.json(); })
            .then(data =>{
                this.setState({cursos: data.cursos});
        })
        this.pegaDados()
    }

    pegaDadosCursoId(id) {
        return fetch('mongodb://rocketdb:a123456@ds121652.mlab.com:21652/rocketdb/cursos/' + id)
                    .then(response => { return response.json(); })
                    .then(data =>{
                        this.setState({curso_cadastro: [data.curso]});
                        return data;
                    })
    }

    cadastraInstrutor(name, email, curso) {
            
        if (name !== undefined || email !== undefined || curso !== undefined) {
            {this.setState({cadastrar: [] })}
            {this.setState({cadastrarSucesso: [0] })}
        }

        const curso_selecionado = this.pegaDadosCursoId(curso)
        curso_selecionado.then(
            response => {
                return fetch('mongodb://rocketdb:a123456@ds121652.mlab.com:21652/rocketdb/instrutores/',{
                    method: "POST",
                    body: JSON.stringify({
                        name: name, 
                        email: email, 
                        cursos: [response.curso]
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            }
        ).catch(error => { console.log(error) })
    }

    pegaDados(id) {
        if (id === undefined) {
            return fetch('mongodb://rocketdb:a123456@ds121652.mlab.com:21652/rocketdb/instrutores/')
                .then(response => { return response.json(); })
                .then(data =>{
                    this.setState({select_instrutores: data.instrutores});
                })
       }else{
            return fetch('mongodb://rocketdb:a123456@ds121652.mlab.com:21652/rocketdb/instrutores/' + id)
                .then(response => { return response.json(); })
                .then(data =>{
                    this.setState({instrutores: [data.instrutor]});
                })
        }
    }
    
    render () {
        const cursos_title = this.state.cursos.map((curso) => {
            return(
              <option key={curso._id} value={curso._id}>{curso.title}</option>
            )
        })

        const instrutores = this.state.instrutores.map((instrutor) => {
            return(
                <div className='panel-footer' key={instrutor._id}>
                    <strong>Nome do Instrutor: </strong>
                    {instrutor.name}
                    <br />
                    <strong>Email do Instrutor: </strong>
                    {instrutor.email}
                    <br />
                    <strong>Curso em que o instrutor {instrutor.name} ministra: </strong>
                    {instrutor.cursos[0].title}
                </div>
            )
        })

        const instrutores_name = this.state.select_instrutores.map((instrutor) => {
            return(
              <option key={instrutor._id} value={instrutor._id}>{instrutor.name}</option>
            )
        })

        const cadastro2 = this.state.cadastrarSucesso.map(() => {
            return( 
                <div className='panel-body text-center'>
                    <strong>Instrutor Cadastrado com sucesso!</strong>
                </div>
            )
        })

        const cadastro1 = this.state.cadastrar.map(() => {
            return( <div>
                <div className='panel-body'>
                        <strong>Nome:</strong>
                            <input className='form-control' onChange={this.input_name} value={this.state.value} placeholder='Nome do Instrutor' type='text' required />
                        <br />
                        <strong>Email:</strong>
                            <input className='form-control' onChange={this.input_email} value={this.state.value} placeholder='Email do Instrutor' type='email' required />
                        <br />
                        <strong>Escolha o curso que o instrutor irá ministrar:</strong>
                        <select onChange={this.input_curso} value={this.state.value} className='form-control'>
                            <option key={undefined} value={undefined}>Escolha o curso</option>
                            {cursos_title}
                        </select>
                    </div>
                    <div className='panel-footer text-center'>
                        <button className='btn btn-lg' onClick={() => this.cadastraInstrutor(this.state.instrutor_input_name, this.state.instrutor_input_email, this.state.instrutor_input_curso)}>Cadastrar</button>
                    </div>
                </div>)
        })

        return (
            <div>
                <div id='instrutores' className='container-fluid'>
                    <div className='text-center'>
                        <h2>Instrutores</h2>
                        <h4>Tela de Cadastro e Pesquisa de Instrutores</h4>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading text-center'>
                                    <h1>Cadastrar Instrutor</h1>
                                </div>
                                {cadastro1}
                                {cadastro2}
                            </div>      
                        </div>     
                        <div className='col-sm-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading text-center'>
                                    <h1>Cursos ministrados pelos instrutores</h1>
                                </div>
                                <div className='panel-body'>
                                    <strong>Pesquise o instrutor:</strong>
                                    <select className='form-control' onChange={this.change} value={this.state.value}>
                                        <option key={undefined} value={undefined}>Escolha o instrutor</option>
                                        {instrutores_name}
                                    </select>
                                </div>
                                    {instrutores}
                                <div className='panel-footer text-center'>
                                    <button className='btn btn-lg' onClick={() => this.pegaDados(this.state.curso_selecionado)}>Pesquisar</button>
                                </div>
                            </div>      
                        </div>   
                    </div>
                </div>
            </div>  
        )
    }
}

export default Instrutor;