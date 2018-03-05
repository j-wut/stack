import React, { Component } from 'react';
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import logo from './logo.svg';
import './App.css';


function Block(props){
  return props.value;
}
function Row(props){
  if(props.values.length > 0){
  var ret = [];
  for(var i=0;i<props.values.length;i++)
    ret.push(<Block value={props.values[i]}/>);
  return(<div>{ret}</div>);
  }
  return;
}

class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      width: 100,
      dir: true, 
      ind: 1,
      length: 20,
      game: [],
    }
    this.timeInterval = setInterval(this.update.bind(this), 50);
  }

  dropRow(){
    var game = this.state.game.slice();
    var crow=Array(this.state.width).fill("__");
    for(var i = 0;i<this.state.length;i++){
      crow[i+this.state.ind]="H";
    }
    if(game.length==0){
      game.push(crow);
      this.setState({game:game});
      return;
    }
    var miss=0;
    for(i = 0;i<this.state.length;i++){
      if(crow[i+this.state.ind]!=game[0][i+this.state.ind]){
        crow[i+this.state.ind]="__";
        miss++;
      }
    }
    game.unshift(crow);
    this.setState({game:game,length:this.state.length - miss,ind:this.state.width - this.state.length - 1});
    clearInterval(this.timeInterval);
    this.timeInterval = setInterval(this.update.bind(this), Math.max(10,50-(game.length/2)*5));
  }

  update(){
    if(this.state.length==0){ //game over
      this.setState({ind:Math.round(Math.random()*80),length:20,game:[]});
      clearInterval(this.timeInterval);
      this.timeInterval = setInterval(this.update.bind(this),50);
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
    return;
  }

  render(){
    var crow=Array(this.state.width).fill("__");
    for(var i = 0;i<this.state.length;i++){
      crow[i+this.state.ind]="H";
    }
    var rend = [];
    rend.push(<div><Row values={crow}/></div>);
    for(i=0;i<this.state.game.length;i++)
       rend.push(<div><Row values={this.state.game[i]}/></div>);
    
    return (
      <div>
        <KeyHandler keyEventName={KEYPRESS} keyValue="ArrowDown" onKeyHandle={this.dropRow.bind(this)} /> 
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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Game/>
      </div>
    );
  }
}

export default App;
