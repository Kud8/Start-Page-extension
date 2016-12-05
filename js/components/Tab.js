'use strict';

import React from 'react';

var dragSrcEl = null;

function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('over');
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    dragSrcEl.style.opacity = '1';
    if (dragSrcEl != this) {
        var from = dragSrcEl.firstChild.firstChild.getAttribute('href');
        var to = this.firstChild.firstChild.getAttribute('href');
        var from_id = -1, to_id = -1;
        dragSrcEl.innerHTML = this.innerHTML;

        chrome.storage.local.get('history', function(result) {
            let history = result['history'];
            //console.log('After get: ', history);
            for (let i = 0; i < history.length; ++i) {
                if (history[i][0] == from) {
                    from_id = i;
                }
                if (history[i][0] == to) {
                    to_id = i;
                }
            }
            console.log(from_id, to_id);
            let tmp = history[from_id];
            history[from_id] = history[to_id];
            history[to_id] = tmp;
            //console.log('Before set: ', history);
            chrome.storage.local.set({'history': history});
        });
        //console.log('From: ' + from + '\nTo: ' + to);
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

function handleDragEnd(e) {
    var tabs = document.getElementsByClassName('tab');
    [].forEach.call(tabs, function (tab) {
        tab.classList.remove('over');
    });
}

export default class Tab extends React.Component {

    componentDidMount() {
        var tabs = document.getElementsByClassName('tab');
        [].forEach.call(tabs, function(tab) {
            tab.addEventListener('dragstart', handleDragStart, false);
            tab.addEventListener('dragover', handleDragOver, false);
            tab.addEventListener('dragleave', handleDragLeave, false);
            tab.addEventListener('drop', handleDrop, false);
            tab.addEventListener('dragend', handleDragEnd, false);
        });
    }

    render() {
        var href = this.props.data[0];

        return (
            <div className="tab" draggable="true">
                <div className="tab_favicon">
                    <a href={href}>
                        <img src={'https://www.google.com/s2/favicons?domain=' + href}/>
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