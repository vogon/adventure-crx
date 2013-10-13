// shamelessly stolen from
// http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
// because I'm lazy
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) 
    {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable)
        {
            return decodeURIComponent(pair[1]);
        }
    }
}

function leave() 
{
	var exitUrl = getQueryVariable("exitUrl");

	chrome.tabs.getCurrent(
		function (tab)
		{
			chrome.tabs.update(tab.id, { "url": exitUrl });
		}
	);
}

document.getElementById("leavelink").addEventListener("click", leave);