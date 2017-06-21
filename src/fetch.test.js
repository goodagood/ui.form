
import React, { Component } from 'react';

class FetchTesting extends Component {

    constructor(props) {
        super(props);

        this.old_jsonurl = "http://localhost:4038/getone";
        this.jsonurl = "/getone";

        this.state = {
            "json": null, // change to "refresh"
        };

        this.fetchjson = this.fetchjson.bind(this);
    }

    fetchjson (){
        console.log(this.jsonurl);
        fetch(this.jsonurl).then((response) =>{
            return response.json();
        }).then((j)=>{
            console.log('json? ', j);
            this.setState({'json': j});
        });
    }

    renderJson = ()=>{
        return (
            <div className="jsondata"
                onClick={()=>{this.setState({'json':null});}}
            >

            <pre>
                {JSON.stringify(this.state.json, null, 4)}
            </pre>
            </div>
        );
    }

    renderButton = ()=>{
        return (
            <div className="fetchtest">
                <form className="fetchtestform">
                    <button 
                    type="button"
                    onClick={this.fetchjson}
                    >

                        0617 0616 test fetching
                    </button>
                </form>
            </div>
       );
    }


    render() {

        if(this.state['json'] === null){
            return this.renderButton();
        }else{
            return this.renderJson();
        }
    }
}

export default FetchTesting;
