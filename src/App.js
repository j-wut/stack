import React, { Component } from 'react';
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import black from './black.png';
import white from './white.png';
import logo from './logo.svg';
import './App.css';


function Block(props){
  switch(props.value){
    case 1:return <img src={black} alt="block"/>;
    default:return <img src={white} alt="blank"/>;
  }
}
function Row(props){
  if(props.values.length > 0){
  var ret = [];
  for(var i=0;i<props.values.length;i++)
    ret.push(<Block value={props.values[i]}/>);
  return(<div className="row">{ret}</div>);
  }
  return;
}

class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      width: 20,
      dir: true, 
      ind: 6,
      length: 4,
      game: [],
      delay: 100,
    }
    setTimeout(this.update.bind(this),this.state.delay);
  }

  dropRow = () => {
    var game = this.state.game.slice();
    var crow=Array(this.state.width).fill(0);
    for(var i = 0;i<this.state.length;i++){
      crow[i+this.state.ind]=1;
    }
    if(game.length==0){
      game.push(crow);
      this.setState({game:game});
      return;
    }
    var miss=0;
    for(i = 0;i<this.state.length;i++){
      if(crow[i+this.state.ind]!=game[0][i+this.state.ind]){
        crow[i+this.state.ind]=0;
        miss++;
      }
    }
    game.unshift(crow);
    var ind;
    var dir = Math.random()>0.5;
    if(dir){
      ind=1;
    }else{
      ind=this.state.width-this.state.length-1;
    }
    this.setState({game:game,dir:dir,length:this.state.length - miss,ind:ind});
    this.setState({delay:this.state.delay-1});
  }
  componentDidMount(){
    window.onkeydown = this.dropRow;
  }

  update(){
    if(this.state.length==0){ //game over
      
      this.setState({ind:1+Math.round(Math.random()*5),length:4,game:[],delay:50});
    }
    var next;
    var dir = this.state.dir;
    if(dir)
    next = this.state.ind -1;
    else
    next = this.state.ind +1;

    if(next<1 || next+this.state.length > this.state.width-1){
      dir = !dir;
    }

    this.setState({dir:dir,ind:next});
    setTimeout(this.update.bind(this),this.state.delay);
  }

  render(){
    var crow=Array(this.state.width).fill(0);
    for(var i = 0;i<this.state.length;i++){
      crow[i+this.state.ind]=1;
    }
    var rend = [];
    rend.push(<div><Row values={crow}/></div>);
    for(i=0;i<this.state.game.length;i++)
       rend.push(<div><Row values={this.state.game[i]}/></div>);
    
    return (
      <div className="grid">
        {rend}
      </div>
    );
  }
  
}





class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Stacker Game ReactJS</h1>
        </header>
        <p className="App-intro">
          Press Down to drop a row.  Source in App.js
        </p>
        <Game/>
      </div>
    );
  }
}

export default App;
