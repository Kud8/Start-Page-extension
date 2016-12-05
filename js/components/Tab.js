import React from 'react';

var dragSrcEl = null;

export default class Tab extends React.Component {

    handleDragStart(e) {
        let self = e.currentTarget;
        self.style.opacity = '0.4';
        dragSrcEl = self;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', self.innerHTML);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        let self = e.currentTarget;
        self.classList.add('over');
        return false;
    }

    handleDragLeave(e) {
        let self = e.currentTarget;
        self.classList.remove('over');
    }

    handleDrop(e) {
        e.stopPropagation();
        let self = e.currentTarget;
        dragSrcEl.style.opacity = '1';
        if (dragSrcEl != self) {
            var from = dragSrcEl.firstChild.firstChild.getAttribute('href');
            var to = self.firstChild.firstChild.getAttribute('href');
            var from_id = -1, to_id = -1;
            dragSrcEl.innerHTML = self.innerHTML;

            chrome.storage.local.get('history', function(result) {
                let history = result['history'];
                for (let i = 0; i < history.length; ++i) {
                    if (history[i].url == from) {
                        from_id = i;
                    }
                    if (history[i].url == to) {
                        to_id = i;
                    }
                }
                console.log(from_id, to_id);
                let tmp = history[from_id];
                history[from_id] = history[to_id];
                history[to_id] = tmp;
                chrome.storage.local.set({'history': history});
            });
            self.innerHTML = e.dataTransfer.getData('text/html');
        }
        return false;
    }

    handleDragEnd(e) {
        var tabs = document.getElementsByClassName('tab');
        [].forEach.call(tabs, function (tab) {
            tab.classList.remove('over');
        });
    }

    render() {
        var href = this.props.data.url;

        return (
            <div className="tab" draggable="true"
                                     onDragStart={this.handleDragStart}
                                     onDragOver={this.handleDragOver}
                                     onDragLeave={this.handleDragLeave}
                                     onDrop={this.handleDrop}
                                     onDragEnd={this.handleDragEnd}>
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