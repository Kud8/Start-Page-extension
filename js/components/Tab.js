'use strict';

import React from 'react';

export default function Tab(props) {
    var data = props.data; //text, favicon = this.props.data
    return (
        <a href={data[0]}>
            <div className="tab">
                <div className="tab_favicon">
                    <img src={data[1]}/>
                </div>
                <div className="tab_name">
                    <h3>{data[0]}</h3>
                </div>
            </div>
        </a>
    );
};