import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

//import ValueEditor from './value.edit.js';
import ValueRec from './value.rec.js';

//import FetchTesting from './fetch.test.js';


class App extends Component {

    render() {
        return (
                <div className="App">
                {/*
                    <p> -- App.js fetch testing 0610 1849pm - 0616 0646 </p>
                    <FetchTesting />
                    <ValueEditor />
                */}
                    <p> App.js testing 0604 0727, 1317, 0619 2041pm,
                    0623 1638pm
                    </p>
                    <ValueRec />
                </div>
               );
    }
}

export default App;
