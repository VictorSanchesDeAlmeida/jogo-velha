import React, { useState } from 'react';

function App() {

  //ESTILOS
  const tabuleiro={
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    gap: '5px'
  }

  const tabuLinha = {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px'
  }

  const casa = {
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    cursor: 'pointer',
    fontSize: 60,
    border: '1px solid black',
    borderRadius: '12px',
    backgroundColor: '#c3c3c37b',
    backdropFilter: 'blur(4px)'
  }

  const jogoInicial = [
    ['','',''],
    ['','',''],
    ['','','']];
  const [jogo, setJogo] = useState([
    ['','',''],
    ['','',''],
    ['','','']]);
  const [simboloAtual, setSimboloAtual] = useState('X');
  const [jogando, setJogando] = useState(true);
  
  const tabu = (j) => {
    return(
      <div style={tabuleiro}>
        <div style={tabuLinha}>
          <div style={casa} data-pos='00' onClick={(e)=>joga(e)}>{j[0][0]}</div>
          <div style={casa} data-pos='01' onClick={(e)=>joga(e)}>{j[0][1]}</div>
          <div style={casa} data-pos='02' onClick={(e)=>joga(e)}>{j[0][2]}</div>
        </div>
        <div style={tabuLinha}>
          <div style={casa} data-pos='10' onClick={(e)=>joga(e)}>{j[1][0]}</div>
          <div style={casa} data-pos='11' onClick={(e)=>joga(e)}>{j[1][1]}</div>
          <div style={casa} data-pos='12' onClick={(e)=>joga(e)}>{j[1][2]}</div>
        </div>
        <div style={tabuLinha}>
          <div style={casa} data-pos='20' onClick={(e)=>joga(e)}>{j[2][0]}</div>
          <div style={casa} data-pos='21' onClick={(e)=>joga(e)}>{j[2][1]}</div>
          <div style={casa} data-pos='22' onClick={(e)=>joga(e)}>{j[2][2]}</div>
        </div>
      </div>
    )
  }

  const btnJogarNovamente = () => {
    if(!jogando){
      return<button onClick={() => reinicia()}>Jogar novamente</button>
    }
  }

  const verificaVitoria = () => {
    let pontos = 0;
    let vitoria = false;

    //linhas
    for (let l = 0; l < 3; l++){
      pontos = 0;
      for(let c = 0; c < 3; c++){
        if(jogo[l][c] === simboloAtual){
          pontos++;
        }
      }
      if(pontos >= 3){
        vitoria = true;
        return vitoria;
      }
    }

    //colunas
    for (let c = 0; c < 3; c++){
      pontos = 0;
      for(let l = 0; l < 3; l++){
        if(jogo[l][c] === simboloAtual){
          pontos++;
        }
      }
      if(pontos >= 3){
        vitoria = true;
        return vitoria;
      }
    }

      //diagonais
      pontos = 0;
      for(let d = 0; d < 3 ; d++){
        if (jogo[d][d] === simboloAtual){
            pontos++;

        }
      }
      if(pontos >= 3){
        vitoria = true;
        return vitoria;
      }
      
      pontos = 0;
      let l=0
      for(let c = 2; c >=0; c--){
        if(jogo[l][c] === simboloAtual){
          pontos++;
        } 
      }
      if(pontos >= 3){
        vitoria = true;
        return vitoria;
      }

  }

  const verificaEmpate = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (jogo[i][j] === '') {
          return false; // Ainda há espaços vazios, o jogo não está empatado
        }
      }
    }
    // Se não houver espaços vazios e ninguém venceu, então o jogo está empatado
    return true;
  }

  const trocaJogador = () => {
    simboloAtual==='X'?setSimboloAtual('O'):setSimboloAtual('X');
  }

  const retPos = (e) => {
    const p = e.target.getAttribute('data-pos');
    const pos = [parseInt(p.substring(0,1)),parseInt(p.substring(1,2))];
    return pos;
  }

  const verificaEspacoVazio = (e) => {
    if(jogo[retPos(e)[0]][retPos(e)[1]] === ''){
      return true;
    }else{
      return false;
    }
  }

  const joga = (e) => {
    if(jogando){
      if(verificaEspacoVazio(e)){
        jogo[retPos(e)[0]][retPos(e)[1]] = simboloAtual;
        trocaJogador()
        if(verificaVitoria()){
          trocaJogador();
          alert('Jogado ' + simboloAtual + ' venceu!!');
          setJogando(false);
        }else if(verificaEmpate()){
          trocaJogador();
          alert('Jogo empatado!!');
          setJogando(false);
        }else{
          trocaJogador();
        }
      }else{
        alert('Espaço não está disponível!!')
      }
    }
  }

  const reinicia = () => {
    setJogando(true);
    setJogo(jogoInicial);
    setSimboloAtual('X');
  }

  return (
    <>
      <div>
        <p>Quem joga: {simboloAtual}</p>
      </div>
      <div className='tabuleiro'>
        {tabu(jogo)}
      </div>
      <div className='btnJogarNovamente'>
        {btnJogarNovamente()}
      </div>
    </>
  );
}

export default App;