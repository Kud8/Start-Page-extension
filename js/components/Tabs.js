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
        loadHistoryFromStorage()
            .then(result => {
                this.setState({history: result});
            });
    }

    render() {
        var data = this.state.history;
        console.log('render Tabs', data);
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


