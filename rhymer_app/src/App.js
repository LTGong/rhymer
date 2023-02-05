import './App.css';
import React from 'react';

const e = React.createElement;

function processRawText(text){
  //return(text + "foo")
  	return(fetch("https://api.datamuse.com/words?ml=ringing+in+the+ears"))
}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Rhymebox/>
      </header>
    </div>
  );
}

class Rhymebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : "sample",
    };
  }
  updateText(text){
    this.setState({text: text});
  }
  render() {
    return(
      <div>
        <Input updateText = {(text) => this.updateText(text)}/>
        <RhymeOutput textContent = {this.state.text}/>
      </div>
    )
  }
}

//<MirrorOutput textContent = {this.state.text}/>
class MirrorOutput extends React.Component {
  render() {
    return e('div', null, `${this.props.textContent}`);
  }
}


class RhymeOutput extends React.Component {
  render() {
    let rawContent = this.props.textContent;
    return e('div', null, `${processRawText(rawContent)}`);
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Pen your Purple Poem'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateText(event.target.value);
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Poem:
          <textarea value={this.state.value} onInput={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
