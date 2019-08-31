import React, { Component } from "react";
// import Logged from './Logged'



function Logged (props) {
  const { result } = props;
  return (
    result ? <div className="Results"> 
    <h1>Bienvenido {result}</h1>
  </div> : null
  );
}

class Secret extends Component {
  state = {
    secret: 0
  };



  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("form submitted");
    this.allow(this.state.form);
  };

  allow = async data => {
    var url = "localhost:8000/setsecret/";
    console.log(this.state.secret);
    
    var URL_SECRET = url + this.state.secret
    console.log(URL_SECRET);

    fetch(URL_SECRET)
      .then(res => res.json())
      .catch(error => console.error("Error: ", error))
      .then(response => {
        console.log("Response: ", response);                
      });
  };

  render() {
    return (
      <div>
        <div className="secret mx-auto d-block">
          <h4>Code Breaker.</h4>
        </div>
        <div className="secret">
          <h1>Secret</h1>
        </div>

        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    name="secret"
                    type="number"
                    maxLength = "4"
                    className="form-control form-control-lg form-rounded"
                    placeholder="secret"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-lg btn-block btn-primary"
                >
                  Set Secret
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Secret;