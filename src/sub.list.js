
import React from 'react';


import {SwitchInput} from './input.bare.js';
import {TextareaOrText} from './text.area.js';

//import {AddSubtitle} from './add.js';

//import SampleData from './sample.data.js';


class Sublist extends React.Component{
    constructor(props) {
        super(props);

        this.subkeys = props.subkeys;
        this.obj = props.obj;
    }


    coupleTitleDescription(uuid, info) {
        // try to give a: Title + Description

        // set a key for react.js, we are not going to use it.
        //var skey = Math.random().toString() + Date.now().toString();
        //if(info.key) skey=info.key;


        var subtitle = (
            <SwitchInput 
                text={info.title}
                obj={info}
                noticeDataChange={this.props.noticeDataChange}
            />
        );


        //    <div className="firstpair">
        //    </div>
        var subdescription = (
                <TextareaOrText
                    text={info.description}
                    obj={info}
                    noticeDataChange={this.props.noticeDataChange}
                />
        );


        return (

            <div className="testPutTitleDescriptionTogether" key={uuid} >

                <div className="row">
                    <span> Sub-title : </span>
                    {subtitle}
                </div>

                <span className="subvalue"> sub-value </span>

                <div> Description: </div>
                <div className="row">
                    {subdescription}
                    --------this.t_renderDescription(info)---
                </div>

            </div>


        );
    }


    makeSublist = ()=>{
        //setTimeout(()=>{console.log(this.tmp.subs.length)}, 2000);

        var subs = this.subkeys;

        return subs.map((key)=> { 
            //console.log('one sub: ', key, this.obj[key]);
            return this.coupleTitleDescription(key, this.obj[key]);
        });
    }

    render() {
        return (

            <div className="Sublist">

                <div className="row">
                    {this.makeSublist()}
                </div>

            </div>


        );
    }

}


//// give only a title and a description
////
//class Vtd extends React.Component {
//    constructor(props) {
//        super(props);
//
//        this.localdata = {
//            'title':'The class name is Vtd value of title and description',
//            'description':'The content of The class name is Vtd value of title and description',
//            'value':0,
//            'milli':null,
//
//            'start': Date.now(),
//            'change': null,
//
//            'timer2save': null,
//
//        };
//
//        this.tmp = SampleData;
//        this.localdata["title"] = this.tmp["title"];
//        this.localdata["description"] = this.tmp["description"];
//        this.localdata["value"] = this.tmp["value"];
//        this.localdata["milli"] = this.tmp["milli"];
//
//        // put key-value for sub-title and the text 
//        //
//        this.state = {
//
//            'added-subtitle': false,
//
//            // sub-titles and sub-descriptions, [{sub}...]
//            // each sub: {title, description, value, milli}
//            //'subTitleDescription':[]
//        };
//
//        //this.handleChange = this.handleChange.bind(this);
//        //this.handleSubmit = this.handleSubmit.bind(this);
//    }
//
//
//
//    getDescriptionChange = (e)=>{
//        console.log("...getDescriptionChange ing");
//        console.log(e.target.value);
//
//        var val = e.target.value;
//        this.localdata.description = val;
//    }
//
//    renderTitle = () => {
//        return (
//                <InputOrText text='pass by props'  info={this.localdata} label="LABEL" />
//       );
//    }
//
//    renderDescription = () => {
//        return (
//                <div className="row">
//
//                    <TextareaOrText 
//                        onChange={this.getDescriptionChange}
//                        text='text of descr. pass by props' />
//
//                </div>
//       );
//    }
//
//    renderSubDescription = () => {
//        return (
//                <div className="row">
//                    <p> 
//                    Sub-description:
//                    </p>
//
//                    {this.renderDescription()}
//
//                    <TextareaOrText 
//                        onChange={this.getDescriptionChange}
//                        text='sub descri. text of descr. pass by props' />
//
//                </div>
//       );
//    }
//
//    save = ()=>{
//        console.log('save 0602 1415');
//    }
//
//    markchange = ()=>{
//        //console.log('markchange, show subs[3]');
//        //console.log(this.tmp.subs[3]);
//
//        const delay = 3 * 1000;
//        //this.localdata.timer2save = setTimeout(this.save, delay);
//
//
//        // can we refer it?
//        //this.localdata.timer2save;
//        if (this.localdata.timer2save != null) {
//          clearTimeout(this.localdata.timer2save); 
//          this.localdata.timer2save = null;
//        }
//        else {
//
//          this.localdata.timer2save = setTimeout(this.save, delay);
//        }
//    }
//
//    // we should add a clear,  when element un-mounted
//    // 2017 0602 1420pm
//
//
//    subsTest = ()=>{
//        //setTimeout(()=>{console.log(this.tmp.subs.length)}, 2000);
//
//        var subs = this.tmp.subs;
//
//        return subs.map((sub)=> { 
//            //console.log('one sub: ', sub);
//            return this.couple(sub);
//        });
//    }
//
//    t_renderTitle = (info, label='Sub-Title') => {
//        // info will get changed by the element
//        //console.log('// info will get changed by the element');
//        //console.log(info);
//
//        const getChange = (e) =>{
//
//            info.title = e.target.value;
//            //console.log('get change in t render title ', info.title);
//            this.markchange();
//        };
//
//        return (
//                <InputOrText
//                    info={info}
//                    label={label}
//                    onChange={getChange}
//                    />
//       );
//    }
//
//    t_renderDescription = (info, label='') => {
//        var getChange = (e) =>{
//            info.description = e.target.value;
//            this.markchange();
//        };
//
//        return (
//                <div className="row">
//
//                    <TextareaOrText 
//                        onChange={getChange}
//                        text={info.description}
//                        info={info}
//                        />
//
//                </div>
//       );
//    }
//
//    couple(info) {
//        // try to give a: Title + Description
//
//        // set a key for react.js, we are not going to use it.
//        var skey = Math.random().toString() + Date.now().toString();
//        if(info.key) skey=info.key;
//
//        return (
//
//            <div className="testPutTitleDescriptionTogether" key={skey} >
//
//                <div className="row">
//                <div className="ten columns">
//                    {this.t_renderTitle(info, 'Sub-Title')}
//                </div>
//
//                <div className="two columns subvalue"> sub-value </div>
//                </div>
//
//                <div> Description: </div>
//                <div className="row">
//                    {this.t_renderDescription(info)}
//                </div>
//
//            </div>
//
//
//        );
//    }
//
//
//    addSub = ()=>{
//        this.tmp.subs.unshift({});
//        console.log(this.tmp.subs.length);
//    }
//    showLocalData = ()=>{
//        console.log(this.localdata);
//    }
//    showTmpData = ()=>{
//        console.log(this.tmp);
//    }
//    show2 = ()=>{
//        console.log(this.tmp.subs[0]);
//        console.log(this.tmp.subs[1]);
//    }
//
//    renderAdd = () => {
//        return (
//                <AddSubtitle  info={this.tmp.subs} />
//       );
//    }
//
//
//
//    render() {
//        return (
//
//            <div className="testPutTitleDescriptionTogether">
//
//                <div className="row">
//                <div className="ten columns">
//                {this.renderTitle()}
//                </div>
//
//                <div className="two columns subvalue">value </div>
//                </div>
//
//                <div> Description: </div>
//                <div className="row">
//
//                {this.renderDescription()}
//
//
//
//                <p>
//                </p>
//
//                <p>
//                <button type="button" onClick={this.addSub}> Add sub-title </button> 
//                <button type="button" onClick={this.showLocalData}> show data </button> 
//                <button type="button" onClick={this.showTmpData}> show tmp </button>
//                <button type="button" onClick={this.show2}> show first 2 in array</button>
//                </p>
//
//                {this.subsTest()}
//                </div>
//
//            </div>
//
//
//        );
//    }
//
//
//
//}
//
//








export {Sublist};
