import React from 'react';
import NavButtons from './NavButtons.js';
import ProgressBar from './ProgressBar.js';

import Pages from './pages';
 
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <Pages/>
                <NavButtons />
                <ProgressBar />
            </div>
        );
    }
}
 
export default App;