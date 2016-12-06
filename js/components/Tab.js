import React from 'react';
import {handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd} from './dragAndDrop'


export default class Tab extends React.Component {

    render() {
        var href = this.props.data.url;

        return (
            <div className="tab" draggable="true"
                                     onDragStart={handleDragStart}
                                     onDragOver={handleDragOver}
                                     onDragLeave={handleDragLeave}
                                     onDrop={handleDrop}
                                     onDragEnd={handleDragEnd}>
                <div className="tab_favicon">
                    <a href={href}>
                        <img src={`https://www.google.com/s2/favicons?domain=${href}`}/>
                    </a>
                </div>
                <div className="tab_name">
                    <a href={href}>
                        <h3>{href}</h3>
                    </a>
                </div>
            </div>
        );
    }
};