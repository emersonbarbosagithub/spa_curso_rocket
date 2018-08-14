import React, { Component } from 'react';

class aluno extends Component {
    constructor() {
        super();
        this.state = {
            alunos: [],
            select_alunos: [],
            turmas: [],
            turma_cadastro: [],
            cadastrar: [0],
            cadastrarSucesso:[]
        }
        this.pegaDados = this.pegaDados.bind(this)
        this.pegaDadosturmaId = this.pegaDadosturmaId.bind(this)
        this.cadastraAluno = this.cadastraAluno.bind(this)
        this.change = this.change.bind(this)
        this.input_name = this.input_name.bind(this)
        this.input_email = this.input_email.bind(this)
        this.input_turma = this.input_turma.bind(this)
    }

    change(event) {
        this.setState({turma_selecionado: event.target.value})
    }

    input_name(event_in) {
        this.setState({aluno_input_name: event_in.target.value})
    }

    input_email(event_in) {
        this.setState({aluno_input_email: event_in.target.value})
    }

    input_turma(event_in) {
        this.setState({aluno_input_turma: event_in.target.value})        
    }

    componentDidMount() {
        fetch('http://localhost:3001/turmas/')
            .then(response => { return response.json(); })
            .then(data =>{
                this.setState({turmas: data.turmas});
        })
        this.pegaDados()
    }

    pegaDadosturmaId(id) {
        return fetch('http://localhost:3001/turmas/' + id)
                    .then(response => { return response.json(); })
                    .then(data =>{
                        this.setState({turma_cadastro: [data.turma]});
                        return data;
                    })
    }

    cadastraAluno(name, email, turma) {

        if (name !== undefined || email !== undefined || turma !== undefined) {
            {this.setState({cadastrar: [] })}
            {this.setState({cadastrarSucesso: [0] })}
        }
            
        const turma_selecionado = this.pegaDadosturmaId(turma)

        turma_selecionado.then(
            response => {
                return fetch('http://localhost:3001/alunos/',{
                    method: "POST",
                    body: JSON.stringify({
                        name: name, 
                        email: email, 
                        turmas: [response.turma]
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
            return fetch('http://localhost:3001/alunos/')
                .then(response => { return response.json(); })
                .then(data =>{
                    this.setState({select_alunos: data.alunos});
                })
       }else{
            return fetch('http://localhost:3001/alunos/' + id)
                .then(response => { return response.json(); })
                .then(data =>{
                    this.setState({alunos: [data.aluno]});
                })
        }
    }
    
    render () {

        const turmas_title = this.state.turmas.map((turma) => {
            return(
              <option key={turma._id} value={turma._id}>{turma.title}</option>
            )
        })

        const alunos = this.state.alunos.map((aluno) => {
            return(
                <div className='panel-footer' key={aluno._id}>
                    <strong>Nome do Aluno: </strong>
                    {aluno.name}
                    <br />
                    <strong>Email do Aluno: </strong>
                    {aluno.email}
                    <br />
                    <strong>Turma em que o aluno '{aluno.name}' estuda: </strong>
                    {aluno.turmas[0].title}
                </div>
            )
        })

        const alunos_name = this.state.select_alunos.map((aluno) => {
            return(
              <option key={aluno._id} value={aluno._id}>{aluno.name}</option>
            )
        })

        const cadastro2 = this.state.cadastrarSucesso.map(() => {
            return( 
                <div className='panel-body text-center'>
                    <strong>Aluno Cadastrado com sucesso!</strong>
                </div>
            )
        })

        const cadastro1 = this.state.cadastrar.map(() => {
            return( 
                <div>
                    <div className='panel-body'>
                        <strong>Nome:</strong>
                            <input className='form-control' onChange={this.input_name} value={this.state.value} placeholder='Nome do Aluno' type='text' required />
                        <br />
                        <strong>Email:</strong>
                            <input className='form-control' onChange={this.input_email} value={this.state.value} placeholder='Email do Aluno' type='email' required />
                        <br />
                        <strong>Escolha o turma que o aluno irá estudar:</strong>
                        <select onChange={this.input_turma} value={this.state.value} className='form-control'>
                            <option key={undefined} value={undefined}>Escolha o turma</option>
                            {turmas_title}
                        </select>
                    </div>
                    <div className='panel-footer text-center'>
                        <button className='btn btn-lg' onClick={() => this.cadastraAluno(this.state.aluno_input_name, this.state.aluno_input_email, this.state.aluno_input_turma)}>Cadastrar</button>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div id='alunos' className='container-fluid'>
                    <div className='text-center'>
                        <h2>alunos</h2>
                        <h4>Tela de Cadastro e Pesquisa de alunos</h4>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading text-center'>
                                    <h1>Cadastrar Aluno</h1>
                                </div>
                                {cadastro1}
                                {cadastro2}
                            </div>      
                        </div>     
                        <div className='col-sm-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading text-center'>
                                    <h1>Alunos cadastrados</h1>
                                </div>
                                <div className='panel-body'>
                                    <strong>Pesquise o aluno:</strong>
                                    <select className='form-control' onChange={this.change} value={this.state.value}>
                                        <option key={undefined} value={undefined}>Escolha o aluno</option>
                                        {alunos_name}
                                    </select>
                                </div>
                                    {alunos}
                                <div className='panel-footer text-center'>
                                    <button className='btn btn-lg' onClick={() => this.pegaDados(this.state.turma_selecionado)}>Pesquisar</button>
                                </div>
                            </div>      
                        </div>   
                    </div>
                </div>
            </div>  
        )
    }
}

export default aluno;