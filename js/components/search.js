'use strict';

import React from 'react';

export default class Search extends React.Component {

    componentDidMount() {
        var searchText = document.getElementById('search_input').value;
        console.log(searchText);
        document.getElementById('search_form').addEventListener('submit', () => {
            chrome.tabs.create({
                'url': 'https://www.google.ru/search?q=' + searchText
            });
        });
    }

    render() {
        return (
            <div className="search_container">
                <form action="" method="post" id="search_form">
                    <input type="search" name="" placeholder="поиск" id="search_input"/>
                    <input type="submit" name="" value="" id="search_submit"/>
                </form>
            </div>
        );
    }
}
