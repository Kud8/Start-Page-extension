/**
 * Created by Дмитрий on 06.12.2016.
 */

function putHistoryIntoStorage(time, self) {
    chrome.history.search({
            'text': '',
            'startTime': time
        },
        (historyItems) => {
            console.log('I am in search!');
            const res = historyItems
                .map((item) => ({ url: item.url, visitCount: item.visitCount }))
                .sort((a, b) => (b.visitCount - a.visitCount > 0))
                .slice(0, 8);

            chrome.storage.local.set({'history': res});
            self.setState({history: res});
        });
}

export function loadHistoryFromStorage(self) {
    var microsecondsPerMonth = 1000 * 60 * 60 * 24 * 30;
    var oneMonthAgo = (new Date).getTime() - microsecondsPerMonth;
    //chrome.storage.local.clear();
    chrome.storage.local.get('history', (result) => {
        if(result['history'] == undefined) {
            putHistoryIntoStorage(oneMonthAgo, self);
        } else {
            //console.log('There are history in the storage');
            self.setState({history: result['history']});
        }
    });
}

export function replaceHrefsIntoStorage(firstElement, SecondElement) {
    let from_id = -1, to_id = -1;
    chrome.storage.local.get('history', function(result) {
        let history = result['history'];
        for (let i = 0; i < history.length; ++i) {
            if (history[i].url == firstElement) {
                from_id = i;
            }
            if (history[i].url == SecondElement) {
                to_id = i;
            }
        }
        //console.log(from_id, to_id);
        let tmp = history[from_id];
        history[from_id] = history[to_id];
        history[to_id] = tmp;
        chrome.storage.local.set({'history': history});
    });
}