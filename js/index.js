import React from 'react';
import ReactDOM from 'react-dom';

import Tabs from './components/historyTabs';
import Links from './components/links';
import Search from './components/search';

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
