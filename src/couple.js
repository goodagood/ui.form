
import React from 'react';

//import './value.css'

class AddSubtitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "showForm" : false,
        };

        // tmp storage for content, avoid state refreshing
        this.box = {
            "title": null,
            "description": null,

            "start": Date.now(), //milli seconds
            "edit": null, //milli seconds
            "save": null, //milli seconds

            "label": "Title",
        };


    }

    tmpTextChange = (e) => {
        this.box.text = e.target.value;
        console.log('tmpTextChange: ', this.box.text);

        // should we save data?
        var milli = Date.now();
        this.box.edit = milli;
    }

    handleFocusOut = (e) => {
        var text = e.target.value;

        // showForm : false  > make input form switch off
        // setState will refresh the render
        this.setState({"showForm": false, "text":text});

        console.log('handle focus out, the state? changed to tmp? ', text, this.state.text);
    }

    save = ()=>{
        // save the data
    }

    renderForm(){

        var label = '';
        if(this.props.label){
            label = this.props.label;
        }

        return (
            <div className="row">

            <form className="testform" onSubmit={this.handleSubmit}>
                    <label> {this.box.label}:
                        <input 
                            className="titleInput"
                            type="text" 
                            defaultValue={this.props.info.title}
                            onChange={this.props.onChange}
                            onBlur={this.handleFocusOut}
                            onFocusout={this.handleFocusOut}
                        />
                    </label>
            </form>

            </div>
            );
    }


    clickText = (e)=>{
        //console.log(this.box);
        //console.log(this.state);
        this.setState({showForm:true});
    }

    renderText(){
        console.log('this.props');
        console.log(this.props);

        //d 
        var text = '---no value for text in render text ---';
        if(this.state.text){
            text = this.state.text;
        }
        if(this.props.text){
            text = this.props.text;
        }

        return (
            <div className="valueapp row">

                    <span> {this.box.label}:
                    </span>
                    <span  onClick={this.clickText} >
                            {this.props.info.title}
                    </span>
            </div>
            );
    }

    addSub = ()=>{
        console.log('adding sub ', typeof this.props.addsub);
    }


    t_renderDescription = (info, label='') => {
        var getChange = (e) =>{
            info.description = e.target.value;
            this.markchange();
        };

        return (
                <div className="row">

                    <TextareaOrText 
                        onChange={getChange}
                        text={info.description}
                        info={info}
                        />

                </div>
       );
    }

    render(){
        if(this.props.label){
            this.box.label = this.props.label;
        }

        const  AddingButton = (
                <button 
                onClick={this.addSub}
                type="button">

                    Add subtitle
                </button>
                );


        const AddingForm = (
            <div className="testAddingNewSubtitle" key={skey} >

                <div className="row">
                <div className="ten columns">
                    {this.t_renderTitle(this.box, 'Sub-Title')}
                </div>

                <div className="two columns subvalue"> sub-value </div>
                </div>

                <div> Description: </div>
                <div className="row">

                {this.t_renderDescription(this.box)}

                </div>

            </div>



                );

        if(this.state.showForm) return this.renderForm();
        //else:
        return  AddingButton;
    }
}


export {AddSubtitle};
