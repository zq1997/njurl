chrome.contextMenus.create({
    title: '通过南京大学VPN访问',
    contexts: ['selection', 'link'],
    onclick: function(params)
    {
        function parseUrl(likely_url) {
            var re = /(http:\/\/|https:\/\/)?(([a-z0-9\-]+\.)+[a-z0-9\-]+)(.*)/i;
            matched = likely_url.match(re);
            if(Boolean(matched)) {
                url = 'https://vpn.nju.edu.cn';
                url += matched[4] ? matched[4] : '/';
                url += ',DanaInfo=' + matched[2];
                if (matched[1] != null && matched[1].toLowerCase() == 'https://') {
                    url += ',SSL';
                }
                return url;
            } else {
                return null;
            }
        }

        var url = null;
        if (Boolean(params.selectionText)) {
            url = params.selectionText;
        } else if (Boolean(params.linkUrl)) {
            url = params.linkUrl;
        }
        url = parseUrl(url);
        if (url != null) {
            chrome.tabs.create({url: url});
        } else {
            alert("无效链接地址");
        }
    }
});