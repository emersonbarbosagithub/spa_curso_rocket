import React, { Component } from 'react';

class Turma extends Component {
    constructor() {
        super();
        this.state = {
            turmas: [],
            select_turmas: [],
            cursos: [],
            curso_cadastro: [],
            select_alunos: [],
            cadastrar: [0],
            cadastrarSucesso:[]
        }
        this.pegaDados = this.pegaDados.bind(this)
        this.pegaDadosCursoId = this.pegaDadosCursoId.bind(this)
        this.pegaDadosAluno = this.pegaDadosAluno.bind(this)
        
        this.cadastraTurma = this.cadastraTurma.bind(this)
        this.change = this.change.bind(this)

        this.input_title = this.input_title.bind(this)
        this.input_description = this.input_description.bind(this)
        this.input_curso = this.input_curso.bind(this)
    }

    change(event) {
        this.setState({turma_selecionado: event.target.value})
    }

    input_title(event_in) {
        this.setState({turma_input_title: event_in.target.value})
    }

    input_description(event_in) {
        this.setState({turma_input_description: event_in.target.value})
    }

    input_curso(event_in) {
        this.setState({turma_input_curso: event_in.target.value})        
    }

    cadastraTurma(title, description, curso) {
        
        if (title !== undefined || description !== undefined || curso !== undefined) {
            {this.setState({cadastrar: [] })}
            {this.setState({cadastrarSucesso: [0] })}
        }
        const curso_selecionado = this.pegaDadosCursoId(curso)
        
        curso_selecionado.then(
            response => {
                return fetch(`https://nameless-reaches-68184.herokuapp.com:${process.env.PORT}/turmas/`,{
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description, 
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

    pegaDadosCursoId(id) {
        return fetch(`https://nameless-reaches-68184.herokuapp.com:${process.env.PORT}/cursos/` + id)
                    .then(response => { return response.json(); })
                    .then(data =>{
                        this.setState({curso_cadastro: [data.curso]});
                        return data;
                    })
    }

    componentDidMount() {
        fetch(`https://nameless-reaches-68184.herokuapp.com:${process.env.PORT}/cursos/`)
            .then(response => { return response.json(); })
            .then(data =>{
                this.setState({cursos: data.cursos});
        })
        this.pegaDados()
        
    }
    
    pegaDadosAluno(id){
        this.setState({select_alunos: [] })
        return fetch(`https://nameless-reaches-68184.herokuapp.com:${process.env.PORT}/alunos/`)
                .then(response => { return response.json(); })
                .then(data =>{
                    //console.log(data.alunos[0].turmas[0]._id)
                    for (let i=0; i < data.alunos.length; i++) {
                        if (data.alunos[i].turmas[0]._id === id){
                            this.setState({select_alunos: [data.alunos[i]]});
                        }
                    }
        })
    }

    pegaDados(id) {
        
        this.pegaDadosAluno(id)
        
        if (id === undefined) {
            return fetch(`https://nameless-reaches-68184.herokuapp.com:${process.env.PORT}/turmas/`)
                .then(response => { return response.json(); })
                .then(data =>{
                    this.setState({select_turmas: data.turmas});
                })
       }else{
            return fetch(`https://nameless-reaches-68184.herokuapp.com:${process.env.PORT}/turmas/` + id)
                .then(response => { return response.json(); })
                .then(data =>{
                    this.setState({turmas: [data.turma]});
            })
        }
    }

    render () {

        const turmas = this.state.turmas.map((turma) => {
            return(
                <div className='panel-footer' key={turma._id}>
                    <strong>Nome da turma: </strong>
                    {turma.title}
                    <br />
                    <strong>Descrição da turma: </strong>
                    {turma.description}
                    <br />
                    <strong>Curso em que a turma '{turma.title}' está inscrita: </strong>
                    {turma.cursos[0].title}
                    <br />
                    <strong>Alunos dessa turma: </strong>
                    <br />
                </div>
            )
        })

        const turmas_title = this.state.select_turmas.map((turma) => {
            return(
              <option key={turma._id} value={turma._id}>{turma.title}</option>
            )
        })

        //Essa constante abaixo precisa ser refeita
        const select_alunos = this.state.select_alunos.map((aluno) =>{
            console.log(aluno)
            
            return(<div>
                    <div className='panel-footer' key={aluno._id}>
                        {aluno.name}
                    </div>
                    <div className='panel-footer' key={aluno._id}>
                    {aluno.name}
                </div></div>
            )
        })

        const cursos_title = this.state.cursos.map((curso) => {
            return(
              <option key={curso._id} value={curso._id}>{curso.title}</option>
            )
        })

        const cadastro2 = this.state.cadastrarSucesso.map(() => {
            return( 
                <div className='panel-body text-center'>
                    <strong>Turma Cadastrada com sucesso!</strong>
                </div>
            )
        })

        const cadastro1 = this.state.cadastrar.map(() => {
            return( 
                <div>
                    <div className='panel-body'>
                        <strong>Título:</strong>
                            <input className='form-control' onChange={this.input_title} value={this.state.value} placeholder='Titulo da Turma' type='text' required />                                        
                        <br />
                        <strong>Descrição:</strong>
                            <input className='form-control' onChange={this.input_description} value={this.state.value} placeholder='Descrição da Turma' type='email' required />
                        <br />
                        <strong>Escolha os cursos que a turma terá acesso:</strong>
                        <br />
                        <select onChange={this.input_curso} value={this.state.value} className='form-control'>
                            <option key={undefined} value={undefined}>Escolha o curso</option>
                            {cursos_title}
                        </select>
                    </div>
                    <div className='panel-footer text-center'>
                        <button className='btn btn-lg' onClick={() => this.cadastraTurma(this.state.turma_input_title, this.state.turma_input_description, this.state.turma_input_curso)}>Cadastrar</button>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div id='turmas' className='container-fluid'>
                    <div className='text-center'>
                        <h2>Turmas</h2>
                        <h4>Tela de Cadastro e Pesquisa de Turmas</h4>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading text-center'>
                                    <h1>Cadastrar Turma</h1>
                                </div>
                                
                                {cadastro1}
                                {cadastro2}
                            </div>      
                        </div>     
                        <div className='col-sm-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading text-center'>
                                    <h1>Turmas cadastradas</h1>
                                </div>
                                <div className='panel-body'>
                                    <strong>Escolha a turma:</strong>
                                    <select className='form-control' onChange={this.change} value={this.state.value}>
                                        <option key={undefined} value={undefined}>Escolha a turma</option>
                                        {turmas_title}
                                    </select>
                                </div>
                                {turmas}
                                {select_alunos}
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

export default Turma;