// popup.js
document.getElementById('generate').addEventListener('click', () => {
    const urlPattern1 = /https:\/\/ywtb\.cuit\.edu\.cn\/file\/apps\/cxek\/index\.html\?code=123&state=GZState#\/StuActivityDetail\?id=([a-z0-9-]+)/;
    const urlPattern2 = /https:\/\/ywtb\.cuit\.edu\.cn\/file\/apps\/cxek\/index\.html\?code=123&state=GZState#\/StuActivitySignDetail\?id=([a-z0-9-]+)&activityId=[a-z0-9-]+/;
    const currentTime = Math.floor(Date.now() / 1000);

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const currentUrl = tabs[0].url;
        let match = currentUrl.match(urlPattern1) || currentUrl.match(urlPattern2);

        if (match) {
            const idValue = match[1];
            const qrCode1 = document.getElementById('qrCode1');
            const qrCode2 = document.getElementById('qrCode2');
            const label1 = document.getElementById('label1');
            const label2 = document.getElementById('label2');

            const randomDelay = Math.floor(Math.random() * 20) + 1; // 1 to 20 seconds
            const signOutTime = currentTime + randomDelay;

            new QRCode(qrCode1, {
                text: `${idValue}|${currentTime}|QD`,
                width: 200,
                height: 200
            });

            new QRCode(qrCode2, {
                text: `${idValue}|${signOutTime}|QT`,
                width: 200,
                height: 200
            });

            label1.textContent = "签到二维码";
            label2.textContent = "签退二维码";

            qrCode1.style.display = 'block';
            qrCode2.style.display = 'block';
            label1.style.display = 'block';
            label2.style.display = 'block';
        } else {
            alert('生成签到退二维码时请打开活动签到退中的活动详情');
        }
    });
});