import React from 'react';

export default function Search() {
    return (
        <div className="search_container">
            <form action="https://www.google.ru/search" method="get" id="search_form">
                <input type="search" name="q" placeholder="поиск" id="search_input"/>
                <input type="submit" name="" value="" id="search_submit"/>
            </form>
        </div>
    );
}
