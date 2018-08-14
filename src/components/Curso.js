import React, { Component } from 'react';

class Curso extends Component {
    
    constructor() {
        super();
        this.state = {
            cursos: [],
            select_cursos: [],
            cadastrar: [0],
            cadastrarSucesso:[]
        }
        this.pegaDados = this.pegaDados.bind(this)
        this.cadastraCurso = this.cadastraCurso.bind(this)
        this.change = this.change.bind(this)
        this.input = this.input.bind(this)
    }

    componentDidMount() {
      this.pegaDados()
    }

    change(event) {
        this.setState({curso_selecionado: event.target.value})
    }

    input(event_in) {
        this.setState({curso_input: event_in.target.value})
    }

    cadastraCurso(title) {
        if (title !== undefined) {
            {this.setState({cadastrar: [] })}
            {this.setState({cadastrarSucesso: [0] })}
        }

        try{    
            return fetch('https://nameless-reaches-68184.herokuapp.com:3001/cursos/',{
                method: "POST",
                body: JSON.stringify({title: title}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        } catch (err) {
            return 'Erro ao listar.'
        }
        
    }

    pegaDados(id) {
            if (id === undefined) {
                return fetch('https://nameless-reaches-68184.herokuapp.com:3001/cursos/')
                    .then(response => { return response.json(); })
                    .then(data =>{
                        this.setState({select_cursos: data.cursos});
                    })
           }else{
                return fetch('https://nameless-reaches-68184.herokuapp.com:3001/cursos/' + id)
                    .then(response => { return response.json(); })
                    .then(data =>{
                        this.setState({cursos: [data.curso]});
                    })
            }
      
    }
    
    render () {
        const cursos = this.state.cursos.map((curso) => {
            return(
                <div className='panel-footer' key={curso._id}>
                    <strong>Nome do Curso: </strong>
                    {curso.title}
                </div>
            )
        })
        const cursos_title = this.state.select_cursos.map((curso) => {
            return(
              <option key={curso._id} value={curso._id}>{curso.title}</option>
            )
        })

        const cadastro2 = this.state.cadastrarSucesso.map(() => {
            return( 
                <div className='panel-body text-center'>
                    <strong>Curso Cadastrado com sucesso!</strong>
                </div>
            )
        })

        const cadastro1 = this.state.cadastrar.map(() => {
            return( 
                <div>
                    <div className='panel-body'>
                        <strong>Título:</strong>
                        <input className='form-control' onChange={this.input} value={this.state.value} placeholder='Título do Curso' type='text' required />
                    </div>
                    <div className='panel-footer text-center'>
                        <button className='btn btn-lg' onClick={() => this.cadastraCurso(this.state.curso_input)}>Cadastrar</button>
                    </div>
                </div>
            )
        })
        
        return (
            <div>
                <div id='cursos' className='container-fluid'>
                    <div className='text-center'>
                        <h2>Cursos</h2>
                        <h4>Tela de Cadastro e Pesquisa de Cursos</h4>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading text-center'>
                                    <h1>Cadastrar Curso</h1>
                                </div>
                                {cadastro1}
                                {cadastro2}
                            </div>      
                        </div>     
                        <div className='col-sm-6'>
                            <div className='panel panel-default'>
                                <div className='panel-heading text-center'>
                                    <h1>Cursos cadastrados</h1>
                                </div>
                                <div className='panel-body'>
                                    <strong>Pesquise o curso:</strong>
                                    <select className='form-control' onChange={this.change} value={this.state.value}>
                                        <option key={undefined} value={undefined}>Escolha o curso</option>
                                        {cursos_title}
                                    </select>
                                </div>
                                    {cursos}
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

export default Curso;