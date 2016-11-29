'use strict';

import React from 'react';

function createEvent(eventName) {
    document.getElementById(eventName).addEventListener('click', () => {
        chrome.tabs.create({
            'url': 'chrome://' + eventName
        });
    });
}

export default class Links extends React.Component{

    componentDidMount() {
        createEvent('history');
        createEvent('bookmarks');
        createEvent('downloads');
    }

    render() {
        return (
            <div className="links_container">
                <div className="links">
                    <div className="links_history">
                        <a id="history">История</a>
                    </div>
                    <div className="links_bookmarks">
                        <a id="bookmarks">Избранное</a>
                    </div>
                    <div className="links_downloads">
                        <a id="downloads">Загрузки</a>
                    </div>
                </div>
            </div>
        );
    }
}
