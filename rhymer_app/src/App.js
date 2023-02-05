import './App.css';
import React from 'react';

const e = React.createElement;

// export async function getAllUsers() {
//     try{
//         const response = await fetch('https://api.datamuse.com/words?ml=ringing+in+the+ears');
//         return await response.json();
//     }catch(error) {
//         return [];
//     }
// }
//
// async function processRawText(text){
//   	let apiCall = await fetch("https://api.datamuse.com/words?ml=ringing+in+the+ears");
//     return apiCall;
// }



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
      text : "text",
      suggestions: "suggestions"
    };
  }

  updateTextAndSuggestions(text){
    this.setState({text: text});
    this.updateFromAPI(text)
  }

  updateResponseState(results){
    //console.log(results)
    this.setState({suggestions: results})
  }

  extractWords(list){
    var res = []
    for (let wordObj of list) {
      res = res.concat([wordObj.word])
    }
    return res
  }

  generateApiInputString(input){
    var lastLine = input.split("\n")
    let tokenizedLastLine = lastLine[lastLine.length-1].split(" ")
    let lastWord = tokenizedLastLine[tokenizedLastLine.length - 1]
    console.log("https://api.datamuse.com/words?ml=" + tokenizedLastLine.join("+") + "&rel_rhy="+lastWord)
    return("https://api.datamuse.com/words?ml=" + tokenizedLastLine.join("+") + "&rel_rhy="+lastWord)
  }

  updateFromAPI(input) {
    let apiResult = fetch(this.generateApiInputString(input))
    .then((response) => response.json())
    .then((list)=> this.extractWords(list))
    .then((response) => this.updateResponseState(response))
  }

  render() {
    return(
      <div>
        <Input updateTextAndSuggestions = {(text) => this.updateTextAndSuggestions(text)}/>
        <RhymeOutput textContent = {this.state.suggestions}/>
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
    return e('div', null, `${this.props.textContent}`);
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
    this.props.updateTextAndSuggestions(event.target.value);
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
