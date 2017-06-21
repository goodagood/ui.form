
import React from 'react';

//import './value.css'

class TextareaOrText extends React.Component {
    constructor(props) {
        super(props);

        const showForm = false || props.obj.showForm;
        //const defaultDescription = props.obj.description || "default description for t-a- input 0607" ;

        this.state = {
            "showForm" : showForm,
            //"text": 'should we make a component for textarea or?',
        };

        // make it a reference, for old things
        this.tmp = props.obj;

        // d?
        this.tmp = {
            "text": null, // tmp storage for content, avoid state refreshing

            "start": Date.now(), //milli seconds
            "edit": null, //milli seconds
            "save": null, //milli seconds

        };

    }

    textChange = (e) => {
        var value = e.target.value;
        this.props.obj.description = value;

        if(this.props.noticeDataChange){
            this.props.noticeDataChange();
        }
        // should we save data?
        //var milli = Date.now();
        //this.tmp.edit = milli;
    }

    handleFocusOut = (e) => {
        var text = e.target.value;
        //console.log('save the changed to tmp ', text);

        // showForm : false  > make input form switch off
        // setState will refresh the render
        this.setState({"showForm": false, "description":text});

        //console.log('the state? changed to tmp? ', this.state);
    }


    //d?
    save = ()=>{
        // save the data
    }

    getDefaultText = ()=>{
        var text = 'warning---input for description textarea  in render form ---';

        if(this.props.obj.description){
            text = this.props.obj.description;
        }

        return text;
    }

    renderForm(){

        var text = this.getDefaultText();


        return (
            <div className="row center">

            <form className="descriptionform" >
                    <textarea 
                        className="sizeisquestion"
                        type="textarea" 

                        defaultValue={text}
                        onChange={this.textChange}
                        onBlur={this.handleFocusOut}
                    />
            </form>

            </div>
            );
    }


    clickText = (e)=>{
        //console.log(this.tmp);
        //console.log(this.state);
        this.setState({showForm:true});
    }

    renderText(){

        var text = this.getDefaultText();

        return (
            <div className="description">

                    <span  onClick={this.clickText} >
                        {text}
                    </span>
            </div>
        );
    }

    render(){
        if(this.state.showForm) return this.renderForm();
        return this.renderText();
    }
}


export {TextareaOrText};
