
import React from 'react';

//import './value.css'
import {TextareaOrText} from './text.area.js';

class SwitchInput extends React.Component {
    constructor(props) {
        super(props);

        // 
        //this.props.obj:  will get from upper level
        // no lable, only a input element.

        const showForm = false || props.obj.showForm;
        const defaultValue = props.obj.title || "default Value for input 0606" ;

        this.state = {
            "showForm" : showForm,
            "defaultValue": defaultValue,
        };

        // no need?
        this.handleFocusOut = this.handleFocusOut.bind(this);

        // data
        this.d = {
            "title": defaultValue, // tmp storage for content, avoid state refreshing

            "start": Date.now(), //milli seconds
            "edit": null, //milli seconds
            "save": null, //milli seconds

            "label": "Title",
        };

    }


    handleFocusOut = (e) => {
        var text = e.target.value;

        // showForm : false  > make input form switch off
        // setState will refresh the render
        this.setState({
            "showForm": false,
            "title":text
        });

        //console.log('handle focus out, the state? changed to tmp? ', text, this.d.text);
        //return ; //?
    }


    render(){
        if(this.state.showForm) return this.renderForm();
        //else:
        return this.renderText();
    }


    textChange = (e) => {
        var value = e.target.value;
        //this.d.title = value; //d
        this.props.obj.title = value; // actually mutable data
        //console.log('textChange 1203: ', this.props.obj.title);

        // should we save data?
        var milli = Date.now();
        this.d.edit = milli;

        this.signalUpstream();
    }

    signalUpstream = ()=>{
        if(this.props.noticeDataChange){
            this.props.noticeDataChange();
        }
        // save the data?
    }

    renderForm(){
        return (
            <form className="bareinput">
                        <input 
                            className="switchInput"
                            type="text" 

                            defaultValue={this.props.obj.title}
                            onChange={this.textChange}
                            onBlur={this.handleFocusOut}
                        />
            </form>

        );
    }


    clickText = (e)=>{
        this.setState({showForm:true});

        //It's not focused when rendered,
        //setTimeout focus it, but ref needed.
        //but click the form again will do the same.
        //
        //setTimeout(()=>{
        //    // maybe we shouldn't use ref,
        //    // just click one more time it will get focus.
        //    this.inputDom.focus();
        //}, 10);
    }

    renderText(){

        return (
            <span  onClick={this.clickText} >
                    {this.props.obj.title}
            </span>
        );
    }

}


// save warning
//class LabelInput  extends React.Component {
//    constructor(props) {
//        super(props);
//
//        // props.obj might give: text, label, showForm
//
//        this.state = {
//            //"label": props.obj.label || "_LABEL_",
//            "changed": "??",
//        };
//
//        // todo, del, props.obj instead
//        this.d = {
//            title: props.obj.title || 'input text',
//            label: props.obj.label || '_LABEL_',
//        };
//    }
//
//
//    render = ()=>{
//        return (
//            <label> {this.d.lable}: 
//                <SwitchInput obj={this.props.obj} />
//            </label>
//        );
//    }
//}
//



class FirstPairOfTitleDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "changed": null,
        };

        //console.log(props.obj);

        this.obj = props.obj; //d

        if(typeof props.obj["showForm"] === 'undefined' || 
                typeof props.obj["showForm"] !== 'boolean'){
            props.obj["showForm"] = false;
        }

        //// move out
        //const onTitleChange = (e)=>{
        //    props.obj.title = e.target.value;
        //    console.log(props.obj.title);
        //    console.log('0607 1429pm');
        //};

    }

    // should notice the upstream
    onTitleChange = (e)=>{
        this.props.obj.title = e.target.value;
        this.props.callback(e);
        console.log(this.props.obj.title);
        console.log('0607 1429pm');
    };
    onDescriptionChange = (e)=>{
        this.props.obj.description = e.target.value;
        this.props.callback(e);
        console.log(this.props.obj.description);
        console.log('0608 0613am');
    };


    render(){
        return (
                <div className="firstpair">
                    <SwitchInput obj={this.props.obj}
                        onChange={this.onTitleChange}
                    />
                    
                    <TextareaOrText obj={this.props.obj}
                        onChange={this.onDescriptionChange}
                    />
                </div>
        );
    }
}


export {SwitchInput, FirstPairOfTitleDescription};
