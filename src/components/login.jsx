import React, { Component } from "react";
import http from "../services/httpService";
import axios from "axios";

import { apiUrl } from "../config.json";

export default class Login extends Component {
    state = {
        data:{
            username:"",
            pwd:"",
        },
        error: false,
    }

    handleChange=(e)=>{
        const dataa = { ...this.state };
        dataa.data[e.currentTarget.name] = e.target.value;
        console.log(e.currentTarget.name);
        this.setState({dataa});
        console.log(this.state.data);
    }

    handleSubmit= async (e)=> {
        e.preventDefault();
        console.log("coming");
        try{
            const { username, pwd } = this.state.data;
                // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, pwd })
        };
        const response = await fetch(apiUrl+"login", requestOptions)
        const data = await response.json();
        console.log("data:",data);
        console.log('Token: ', data.token);
        console.log('isLogin', data.isLogin);
        const isLogin = data.isLogin;
        const token = data.token;
        // console.log(response);
            //const axios = require('axios');
            // const response =  http.post((apiUrl+'login'), { username, pwd });
            
            // new Promise(resolve => setTimeout(resolve, 10011110));
            // console.log(data.isLogin);
            
                        console.log(response);
                        if(isLogin) {
                            localStorage.setItem("authorization",token);
                           this.props.history.push("/");
                        };

            console.log("Reached!");
        }
        catch(ex){
            console.log("error");
        }
            // const { state } = this.props.location;
        
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>UserName</label>
                    <input 
                    name="username"
                    value={this.state.data.username} 
                    onChange={this.handleChange}
                    className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" 
                    name="pwd"
                    onChange={this.handleChange} 
                    value={this.state.data.pwd}
                    className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                
                <button  className="btn btn-primary btn-block" >Submit</button>
                
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
