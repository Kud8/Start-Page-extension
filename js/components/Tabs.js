import React from 'react';
import Tab from './Tab';
import {loadHistoryFromStorage} from './storage'

export default class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
    }

    componentWillMount() {
        loadHistoryFromStorage(this);
    }

    render() {
        var data = this.state.history;
        var tabsTemplate = data.map(function(item, index) {
           return (
               <Tab data={item} key={index} />
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


