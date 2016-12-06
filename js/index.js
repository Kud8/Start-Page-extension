import React from 'react';
import ReactDOM from 'react-dom';

import Tabs from './components/Tabs';
import Links from './components/Links';
import Search from './components/Search';

const elem =
    <div className="container">
        <Search />
        <Tabs />
        <Links />
    </div>;

ReactDOM.render(
    elem,
    document.getElementById('root')
);
