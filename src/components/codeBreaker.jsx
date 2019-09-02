import React, { Component } from "react";
import "./styles.css";

function Result (props) {
  const { result } = props;
  return (
    result ? <div className="Results"> 
    <h1> {result}</h1>
  </div> : null
  );
}

function ResultGuess (props) {
  const { resultGuest } = props;
  return (
    resultGuest ? <div className="ResultsGuess"> 
    <h1> Result: {resultGuest}</h1>
  </div> : null
  );
}

class CodeBreaker extends Component {
  state = {
    secret: null,
    guess: null,
    result: "",
    resultGuest:""
  };



  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
  };

  handleChangeGuess = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("form submitted");
    this.allow();
  };

  handleSubmitGuess = async e => {
    e.preventDefault();
    console.log("form submitted");
    this.allowGuess();
  };

  allow = async data => {
    var url = "https://codeb-api.herokuapp.com/setsecret/";
    console.log(this.state.secret);
    
    var URL_SECRET = url + this.state.secret
    console.log(URL_SECRET);

    fetch(URL_SECRET)
      .then(res => res.json())
      .catch(error => console.error("Error: ", error))
      .then(response => {
        console.log("Response: ", response);
        this.setState({result: response.message})                
      });
  };

  allowGuess = async data => {
    var url = "https://codeb-api.herokuapp.com/guess/";
    console.log(this.state.guess);
    
    var URL_GUESS = url + this.state.guess
    console.log(URL_GUESS);

    fetch(URL_GUESS)
      .then(res => res.json())
      .catch(error => console.error("Error: ", error))
      .then(response => {
        console.log("Response: ", response);
        Result(response)
        this.setState({resultGuess: response.result})                 
      });
  };

  render() {
    return (
      <div>
        <div className="tittle">
          <h4>Code Breaker</h4>
        </div>


        <div className="formSecret">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    name="secret"
                    type="number"
                    className="setsecret"
                    placeholder="Secret"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit"
                >
                  Set Secret
                </button>
              </form>
              <div className="result">
                <Result result={this.state.result} />
              </div>

              <form onSubmit={this.handleSubmitGuess}>
                <div className="form-group">
                  <input
                    name="guess"
                    type="number"
                    className="setguess"
                    placeholder="Guess"
                    onChange={this.handleChangeGuess}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submitGuess"
                >
                  Guess
                </button>
              </form>
              <div className="resultGuess">
                <ResultGuess resultGuest={this.state.resultGuess} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CodeBreaker;