import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
    return (
        <nav className='navbar navbar-default navbar-fixed-top'>
            <div className='container'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>                        
                    </button>
                    
                    <Link to='/'>
                        <img src={require('../img/rocket.png')} alt='Rocket' width='129' height='71' />
                    </Link>
                </div>
                <div className='collapse navbar-collapse' id='myNavbar'>
                <br/>
                    <ul className='nav navbar-nav navbar-left'>
                        <li><Link to='/'>INÍCIO</Link></li>
                        <li><Link to='/cursos'>CURSOS</Link></li>
                        <li><Link to='/turmas'>TURMAS</Link></li>
                        <li><Link to='/alunos'>ALUNOS</Link></li>
                        <li><Link to='/instrutores'>INSTRUTORES</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;