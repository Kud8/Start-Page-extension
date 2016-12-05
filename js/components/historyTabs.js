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
                urlArray.push( {url: historyItems[i].url, visitCount: historyItems[i].visitCount});
            }
            urlArray.sort(function(a, b) {
                return b.visitCount - a.visitCount;
            });
            console.log(urlArray.slice(0, 8));
        });
}

export default class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
    }

    componentWillMount() {
        var microsecondsPerMonth = 1000 * 60 * 60 * 24 * 30;
        var oneMonthAgo = (new Date).getTime() - microsecondsPerMonth;
        var urlArray = [];
        var self = this;
        //chrome.storage.local.clear();
        chrome.storage.local.get('history', function (result) {
            if(result['history'] == undefined) {
                chrome.history.search({
                        'text': '',
                        'startTime': oneMonthAgo
                    },
                    function (historyItems) {
                        console.log('I am in search!');
                        for (var i = 0; i < historyItems.length; ++i) {
                            urlArray.push({url: historyItems[i].url, visitCount: historyItems[i].visitCount});
                        }
                        urlArray.sort(function (a, b) {
                            return b.visitCount - a.visitCount;
                        });
                        chrome.storage.local.set({'history': urlArray.slice(0, 8)});
                        this.setState({history: urlArray.slice(0, 8)});
                    }.bind(this));
                return;
            } else {
                console.log('There are history in the storage');
                this.setState({history: result['history']});
            }
        }.bind(this));
    }

    componentDidMount() {
        chrome.storage.onChanged.addListener(function (changes, namespace) {
            this.render();
            for (let k in changes) {
                var storageChange = changes[k];
                console.log('Storage key "%s" in namespace "%s" changed. ' +
                    'Old value was "%s", new value is "%s".',
                    k,
                    namespace,
                    storageChange.oldValue,
                    storageChange.newValue);
            }
        }.bind(this));
    }

    render() {
        var countOfTabs = 8;
        var data = this.state.history;
        console.log(data);
        if (data.length < countOfTabs) {
            console.log('length < 8');
            for (var i = data.length; i < countOfTabs; ++i) {
                data[i] = {url : ''};
            }
        }
        if (data.length > countOfTabs) {
            data = data.slice(0, countOfTabs);
        }
        var tabsTemplate = data.map(function(item, index) {
           return (
               <Tab data={item} key={index}/>
           )
        });

        return (
            <div className="tabs_container">
                <div className="tabs">
                    {tabsTemplate}
                </div>
            </div>
        );
    }
};


