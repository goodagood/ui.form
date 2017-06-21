
import React, { Component } from 'react';

import {AddSubtitleDescription} from './add.td.js';
import {FirstPairOfTitleDescription} from './input.bare.js';

import {Sublist} from './sub.list.js';

import {generateUUID} from './gen.uuid.js';
//import SampleData from './sample.data.0605.1616.js';

import "./value.editor.css";

//console.log(SampleData);

class ValueEditor extends Component {

    constructor(props) {
        super(props);

        this.jsonurl = "/getone";

        //this.data = props.data;
        //this.data = Object.assign({}, SampleData);
        this.data = setTimeout(this.fetchone, 0);

        this.state = {
            "changed": null, // change to "refresh"
            "dataFetched":false,
        };

        this.manager = {
            "milli_save": 0,
            "milli_change": 0,
        };

        //this.subkeys = this.getSubkeys();
        //console.log(this.subkeys);

        //this.first_title_description = this.data['_title_description'];
    }

    //todo
    fetchone = ()=>{
        //console.log(this.jsonurl);
        this.data = null;
        fetch(this.jsonurl).then((response) =>{
            return response.json();
        }).then((j)=>{
            //console.log('json? ', j);
            this.data = j;

            this.subkeys = this.getSubkeys();
            this.first_title_description = this.data['_title_description'];
            this.setState({'dataFetched':true});
        });
    }


    getSubkeys = ()=>{
        var keys = Object.keys(this.data);

        keys.splice(keys.indexOf('_title_description'), 1);
        return keys;
    }


    firstTitleAndDescription = ()=>{
        //console.log('start .. tit des');
        //console.log(this.first_title_description);

        // change to this.noticeDataChange
        const cb = (e)=>{
            this.manager['milli_change'] = Date.now();
            console.log( this.manager['milli_change'], ' changed');
        }

        return (
            <div>
                <FirstPairOfTitleDescription
                    obj={this.first_title_description}
                    noticeDataChange={this.noticeDataChange}
                    callback={cb}
                />
            </div>
        );
    }


    // move?
    addSubtitleAndDescription = ()=>{

        ////d
        //const onTitleChange = (e)=>{
        //    console.log(e.target.value);
        //};
        //const onDescriptionChange = (e)=>{
        //    console.log(e.target.value);
        //};
        //const onSubmit = (e, data)=>{
        //    //console.log(e.target.value);
        //    //console.log('get add subtitle and description event:');
        //    //console.log(data);

        //    this.setState({"changed": Date.now()});
        //};

        const milli = Date.now().toString();

//            "onTitleChange": onTitleChange, //d
//            "onDescriptionChange": onDescriptionChange, //d
        const data = {
            "defaultTitle": `subtitle at ${milli} ms`,
            "label4title": "Sub-title",

            "defaultText": "waiting for input...",
            "caption4description": "Sub-description",

            "buttonCaption": "Add Sub title and description",

        };

//                    onSubmit={onSubmit}
        return (
            <div>
                <AddSubtitleDescription
                    info={data}
                    obj={this.data}

                    noticeDataChange={this.noticeDataChange}
                />
            </div>
        );
    }


    makeSublist = ()=>{
        return (
            <Sublist
                subkeys={this.subkeys} 
                obj={this.data} 
                noticeDataChange={this.noticeDataChange}
            />
        );
    }


    save = ()=>{
        console.log('0617 1127am save called');
        if(this.manager.milli_change > this.manager.milli_save){

            this.manager['milli_save'] = Date.now();
            // do the saving
            console.log('do the save:    ', this.data);
        }

    }

    componentDidMount = () =>{
        this.saveTimer = setInterval(this.save, 5000);
    }
    componentWillUnmount = () =>{
        clearInterval(this.saveTimer);
    }


    noticeDataChange = ()=>{
        this.manager['milli_change'] = Date.now();
    }


    //testing info

    showSampleData = ()=>{
        var keys = Object.keys(this.data);
        keys.map((k)=>{
            console.log(k, this.data[k]);
            return '';
        });
        //console.log(this.data);
    }
    showFirst = ()=>{
        console.log(this.data['_title_description']);
    }

    gen_uuid = ()=>{
        console.log(generateUUID());
    }
    showsubkeys = ()=>{
        console.log(this.getSubkeys());
    }

    renderData = ()=>{
        if(!this.data){
            return this.renderButton();
        }

        return (
                <div className="valueEditor">
                    <div className="testing row">
                        "value.edit.js this is for testing"
                    </div>

                    {this.firstTitleAndDescription()}

                    <div className="row showsampledata">
                        <button type="button" onClick={this.showSampleData}> show sample </button>
                        <button type="button" onClick={this.showFirst}> show first data </button>
                        <button type="button" onClick={this.gen_uuid}> gen uuid </button>
                        <button type="button" onClick={this.showsubkeys}> show subkeys </button>
                    </div>

                    <div className="row">
                        {this.addSubtitleAndDescription()}
                    </div>

                    <div className="row subtdp">
                        <p>sub title and description pairs</p>
                        {this.makeSublist()}
                    </div>
                    {/*
                    */}
                </div>
               );
    }

    renderButton = ()=>{
        return (
            <div className="fetchtest">
                <form className="fetchtestform">
                    <button 
                    type="button"
                    onClick={this.fetchone}
                    >

                        Before Data Fetched
                    </button>
                </form>
            </div>
       );
    }

    render() {
        if(!this.state.dataFetched){
            return this.renderButton();
        }else{
            return this.renderData();
        }
    }
}

export default ValueEditor;
