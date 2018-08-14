import React from 'react';

const Home = props => {
    
    return (
        <div>
            <div className='jumbotron text-center'>
                <p className='text_rocket'>
                    <h1 >FALA DEV</h1> Rocketseat,
                </p>
                <h2>Vamos codar?!</h2>
                <img className='foto_circle' src={require('../img/rocket_cor.png')} alt='Rocket_Cor' width='129' height='71' />
            </div>
            
            <div className='container-fluid bg-rocket'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <img className='foto_circle' src={require('../img/emerson.png')} alt='Emerson' width='30%' height='30%' />
                    </div>
                    <div className='col-sm-8 '>
                            <h2><p className='text_white'>Emerson Barbosa</p></h2>
                            <h4><p className='text_white'><strong>BIO:</strong> Desenvolvedor amante de tecnologia com ascendência em modelagem 3D.</p></h4><br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;