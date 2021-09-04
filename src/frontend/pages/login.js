import React from "react";

import "./style/login.css";
import LoginBox from "../components/LoginBox";

import config from "../config";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   loading: true,
    //   error: false,
    // };
  }
  // login automatico para desarrollo
  // componentDidMount(){
  //   const data = {
  //     username: 'marlord',
  //     password: 'marlord',
  //   };
  //   this.fetchLogin(data);
  // }

  handleSubmit(user, pass) {
    if (!user || !pass) {
      return alert("Rellenar todos los campos");
    }
    const data = {
      username: user,
      password: pass,
    };
    this.fetchLogin(data);
  }

  fetchLogin = async (data) => {
    try {
      const request = await fetch(
        `${config.api.url}:${config.api.port}/auth/login`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const response = await request.text();
      const response2 = await JSON.parse(response);
      if (response2.status === 400) {
        alert("Datos Incorrenctos");
      } else {
        this.props.onLogin(response2.body);
      }
    } catch (err) {
      console.error("[ERROR]" + err);
    }
  };

  render() {
    // if(this.state.loading){
    //   // return <Loading />
    //   return "Loading..."
    // }
    // if(this.state.error){
    //   // return <Error />
    //   return 'Error'
    // }
    return (
      <div className="login">
        <div className="login-conteiner">
          <div className="login-page-name">
            <h1>RedSocial</h1>
            <h3>
              Comunicate y comparti con las personas que forman parte de tu vida
            </h3>
          </div>
          <div className="login-page-input">
            <LoginBox handleSubmit={this.handleSubmit.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
