const links = Array.from(document.getElementsByTagName('a')).map(a => a.href);
chrome.runtime.sendMessage({type: 'data', content: someData});