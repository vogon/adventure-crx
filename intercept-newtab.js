watched_tabs = []

function interceptNewTab(tab)
{
	var interceptUrl = chrome.extension.getURL('newtab.html');
	interceptUrl += "?exitUrl=" + encodeURIComponent(tab.url);

	chrome.tabs.update(tab.id, { "url": interceptUrl });
}

function handleTabCreated(tab)
{
	console.log("tab created with id " + tab.id);

	if (tab.url.indexOf("chrome-search://") == 0)
	{
		console.log("intercepting at create");
		interceptNewTab(tab);
	} 
	else 
	{
		watched_tabs.push(tab.id);
	}
}

function handleTabUpdated(tabId, changeInfo, tab)
{
	console.log("tab updated with id " + tabId + "; change info " + changeInfo);

	var watchIndex = watched_tabs.indexOf(tabId);

	if (watchIndex != -1)
	{
		console.log("changed tab is watched");

		if (tab.url.indexOf("chrome-search://") == 0)
		{
			console.log("intercepting at change");
			interceptNewTab(tab);
		}

		watched_tabs.splice(watchIndex, 1);
	}
}

chrome.tabs.onCreated.addListener(handleTabCreated);
chrome.tabs.onUpdated.addListener(handleTabUpdated);