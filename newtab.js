function leave() 
{
	chrome.tabs.getCurrent(
		function (tab)
		{
			chrome.tabs.update(tab.id, { "url": "chrome://newtab/" });
		}
	);
}

document.getElementById("leavelink").addEventListener("click", leave);