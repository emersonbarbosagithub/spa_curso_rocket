import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Curso from './components/Curso';
import Turma from './components/Turma';
import Aluno from './components/Aluno';
import Instrutor from './components/Instrutor';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route path='/' exact component={ Home } />
          <Route path='/cursos' component={ Curso } />
          <Route path='/turmas' component={ Turma } />
          <Route path='/alunos' component={ Aluno } />
          <Route path='/instrutores' component={ Instrutor } />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
