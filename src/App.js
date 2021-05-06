import logo from './logo.svg';
import './App.css';
import React from 'react';
import { render } from 'react-dom';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url : '',
      content : '',
      countStr : 0,
      countInt : 0,
      countNum : 0,
      countStrNum : 0,
      loading : false,
      showReport : false,
      size : 1
    }
    
  }

  
  generate = async () => {
    this.setState({loading : true});

 
    let content = '',
      countStr = 0,
      countInt = 0,
      countNum = 0,
      countStrNum = 0;

    while(content.length < this.state.size * 1024){
      const string = Math.random().toString(36).substring(7);
      const number = Math.floor((Math.random() * 10000) + 1);
      const int = Math.floor((Math.random() * 100) + 1);

      countStr++
      countInt++
      countNum++
      countStrNum++
      
      content += `${string}, ${number}, ${int}, ${string + number}`
    }
    
    await this.generateLink(content);

    this.setState({
      content:content, 
      loading : true, 
      countStr : countStr,
      countInt : countInt,
      countNum : countNum,
      countStrNum : countStrNum})
  }

  generateLink = (content) => {
   
    let file = null;
    const data = new Blob([content], {type: 'text/plain'});

    if (file !== null) {
      window.URL.revokeObjectURL(file);
    }

    file = window.URL.createObjectURL(data);
    this.setState({ url : file })
  }

  showReport = () => {
   this.setState({showReport : true})
  }

  sizeChange = (event) => {
    this.setState({size: event.target.value});
  }

  render(){
    return (
      <div class="container">
        <div class="border rounded p-4 mt-5">
          <div>
            <div class="d-flex">
              <button class="btn" onClick={this.generate}>Generate 🔧</button> 
              <div className="align-self-center ml-auto text-right">
                <input type="text" className="col-md-3 text-center" value={this.state.size} onChange={this.sizeChange}/> <span class="align-self-center text-muted">kb</span>
              </div>
            </div>
            <div class="mt-3">Link : <a href={this.state.url} download>{this.state.url}</a> 🚀</div>
            <button class="btn mt-3" onClick={this.showReport}>Report 📈</button>
            <div class="mt-3">📄 Alphabetical strings : { this.state.showReport ? this.state.countStr : 0 }</div>
            <div class="mt-3">📄 Real numbers : { this.state.showReport ? this.state.countNum : 0 }</div>
            <div class="mt-3">📄 Integers : { this.state.showReport ? this.state.countInt : 0 }</div>
            <div class="mt-3">📄 Alphanumerics : { this.state.showReport ? this.state.countStrNum : 0 }</div>
          </div>
        </div>
      </div>

    );
  }
}

