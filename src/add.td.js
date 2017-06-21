
/*
 * Add a pair of Title Description
 *
 */

import React, { Component } from 'react';


import {generateUUID} from './gen.uuid.js';

/*
 * Show the form in need
 */
class AddSubtitleDescription extends Component {

    constructor(props) {
        super(props);

        // 
        //this.props:  showInput, defaultValue
        // no lable

        //console.log(props);
        //console.log(Object.keys(props));
        //console.log(props.info);
        //console.log('did you get props?');

        var showInput = false;
        if(props.showInput) showInput = true;

        this.uuid = null;

        this.state = {
            "showInput" : showInput, // show a button to add 
            "defaultText": 'default  text, switch input',
        };

        // data
        this.d = {
            //"text": null, //d tmp storage for content, avoid state refreshing
            "title": null, // tmp storage for content, avoid state refreshing
            "description": null, // tmp storage for content, avoid state refreshing

            //"start": null, //Date.now(), //milli seconds
            "edit": null, //milli seconds
            "save": null, //milli seconds

            //"label": "Title", //d
        };

    }


    //d
    handleFocusOut = (e)=>{
        this.setState({showInput: false});
        //console.log('handlefocus out');
    }


    buttonClick = (e)=>{
        this.uuid = generateUUID();
        this.clearData();
        //console.log(this.uuid, 'button clicked add.td.js');
        this.setState({showInput: true});
    };

    clearData = ()=>{
        this.d.title = null;
        this.d.description = null;

        // this.d = {};
    }


    formSubmit = (e)=>{
        e.preventDefault();

        if(!this.d.title && !this.d.description){
            // do nothing, discard empty form
            return this.setState({showInput: false});
        }

        //if(!this.props.obj){
        //    console.log('no obj for changes, in add td js');
        //}

        // if empty title, make it string of milli-seconds
        if(!this.d.title) this.d.title = Date.now().toString();

        if(!this.uuid) this.uuid = generateUUID();

        // props should be the whold object,
        // this make it a new key and value.
        this.props.obj[this.uuid] = this.d;

        this.setState({showInput: false});

        // call the event handler from up-stream
        // to notice the data change should be commited.
        if(this.props.onSubmit){
            this.props.onSubmit(e, this.d);
        }
        return false;
    };


    titleChange = (e)=>{
        var value = e.target.value;
        //this.props.obj[this.uuid]

        this.d.title = value;
        this.d.edit = Date.now();
    }

    descriptionChange = (e)=>{
        var value = e.target.value;
        //this.props.obj[this.uuid]

        this.d.description = value;
        this.d.edit = Date.now();
    }

    //
    //                      defaultValue={this.props.info.defaultTitle}
    //
    //                      defaultValue={this.props.info.defaultText}
    //

    showInput = ()=>{

//                            onBlur={this.handleFocusOut}

        return (

            <form className="switchform" onSubmit={this.formSubmit}>
                    <label> {this.props.info.label4title}:
                        <input 
                            className="switchInput"
                            type="text" 
                            placeholder={this.props.info.defaultTitle}
                            onChange={this.titleChange}
                        />
                    </label>

                    <div className="row">
                        <div>
                            {this.props.info.caption4description}:
                        </div>
                        <textarea 
                            className="switchTextarea"
                            placeholder={this.props.info.defaultText}
                            onChange={this.descriptionChange}
                        />
                    </div>

                    <input type="submit" value="Submit" />
                    <button type="button" onClick={this.handleFocusOut}> Cancel </button>

            </form>
       );
    }


    render() {
        const button = (
                <form className="showFormOrButton">
                <button type="button"
                    onClick={this.buttonClick}
                >
                {this.props.info.buttonCaption}
                </button>
                </form>
        );

        if(this.state.showInput){ 
            return (
                <div className="showFormOrButton">
                    {this.showInput()}
                </div>
            );
        }else{
            return button;
        }


    }
}

export {AddSubtitleDescription};
