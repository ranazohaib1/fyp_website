import React, { Component } from 'react';
import axios from "axios";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { apiUrl } from "../config.json";
import classes from'./Home.css';
class Home extends Component {
    state = {
        amount:"",
    }
     codeGenerator = async() => {
        const authorization = localStorage.getItem("authorization");
        const qty = this.state.amount;
        fetch("http://192.168.100.140:5000/codes/generate", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'authorization': authorization
            },
            body: JSON.stringify({
                body: JSON.stringify({ qty, authorization })
            })
        }).then((response)=>{
            console.log(response)
            var zip = new JSZip();
            var zipData = response.data // 
            // Add an top-level, arbitrary text file with contents
            zip.file("response.txt", zipData);
            
            // Generate the zip file asynchronously
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                // Force down of the Zip file
                saveAs(content, "zipFile.zip");
            });
          
        }).catch((error)=>{
          console.log(error)
        })
        // const axios = require('axios');
        // const url = "codes/generate";
        // const response = await axios.post(apiUrl+url,data);
       
        // console.log("Reached!");
        // console.log(response);

    }

    handleChange=(e)=>{
        const quantity = {...this.state};
        quantity[e.currentTarget.name] = e.target.value;
        console.log(e.target.value);
        console.log(quantity);

        this.setState(quantity);

    }
    render() { 
        return ( 
        <div>
        <form onSubmit = {this.codeGenerator}>
            <h3>COUNTERFEIT PRODUCT DETECTION SYSTEM</h3>

            <div className="form-group">
                <label>Number of codes</label>
                <input type="number"
                name="amount"
                value={this.state.amount} 
                onChange={this.handleChange}
                className="form-control" placeholder="Enter username" />
            </div>
            
            <button  className="btn btn-primary btn-block"  >Submit</button>

        </form>
        </div>
         );
    }
}
 
export default Home;