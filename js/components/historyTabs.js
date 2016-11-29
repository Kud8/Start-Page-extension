'use strict';

import React from 'react';
import Tab from './Tab';

function buildTypedUrlList() {
    var microsecondsPerMonth = 1000 * 60 * 60 * 24 * 30;
    var oneMonthAgo = (new Date).getTime() - microsecondsPerMonth;

    var urlArray = [];
    chrome.history.search({
            'text': '',
            'startTime': oneMonthAgo
        },
        function(historyItems) {
            for (var i = 0; i < historyItems.length; ++i) {
                urlArray.push([historyItems[i].url, historyItems[i].visitCount]);
            }
            urlArray.sort(function(a, b) {
                return b[1] - a[1];
            });
            console.log(urlArray.slice(0, 8));
        });
}

//var event = new Event('historySorted');

export default class Tabs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            history: [
                ["google.com", "https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png"],
                ["vk.com", "https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png"],
                ["google.ru", "https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png"],
                ["mail.ru", "https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png"],
                ["google.com", "https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png"],
                ["openedu.ru", "https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png"],
                ["google.com", "https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png"],
                ["vk.com", "https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png"],
            ]
        };
    }

    componentWillMount() {
        var microsecondsPerMonth = 1000 * 60 * 60 * 24 * 30;
        var oneMonthAgo = (new Date).getTime() - microsecondsPerMonth;
        var urlArray = [];
        var self = this;
        chrome.history.search({
                'text': '',
                'startTime': oneMonthAgo
            },
            function(historyItems) {
                for (var i = 0; i < historyItems.length; ++i) {
                    urlArray.push([historyItems[i].url, historyItems[i].visitCount]);
                }
                urlArray.sort(function(a, b) {
                    return b[1] - a[1];
                });
                self.setState({history: urlArray.slice(0, 8)});
                //root.dispatchEvent(event);
            }.bind(this));
    }

    render() {
        //root.addEventListener('historySorted', function(e) {
        return (
            <div className="tabs_container">
                <div className="tabs">
                    <Tab data={this.state.history[0]}/>
                    <Tab data={this.state.history[1]}/>
                    <Tab data={this.state.history[2]}/>
                    <Tab data={this.state.history[3]}/>
                    <Tab data={this.state.history[4]}/>
                    <Tab data={this.state.history[5]}/>
                    <Tab data={this.state.history[6]}/>
                    <Tab data={this.state.history[7]}/>
                </div>
            </div>
        );
        //}, false);
        //заменить на tabsTemplate с data.map
    }
};


