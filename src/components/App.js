import React from 'react';
import NavButtons from './NavButtons.js';
import ProgressBar from './ProgressBar.js';

import Pages from './pages';



export default function App(props) {
    return (
        <div className="container">
            <Pages/>
            <NavButtons />
            <ProgressBar />
        </div>
    );
}
