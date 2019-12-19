// main.htmlを新しいタブで開く
var showMainPage = function() {
  chrome.windows.create({
    url:'main.html',
    type: 'popup',
    width: 650, height: 450,
        focused: true
  });
};
 
(function() {
  chrome.browserAction.onClicked.addListener(showMainPage);
}) ();