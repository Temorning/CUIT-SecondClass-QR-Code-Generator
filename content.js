// content.js
document.addEventListener('DOMContentLoaded', function() {
    const urlPattern = /https:\/\/ywtb\.cuit\.edu\.cn\/file\/apps\/cxek\/index\.html\?code=123&state=GZState#\/StuActivityDetail\?id=([a-z0-9-]+)/;
    const currentTime = Date.now();
    const elements = document.body.getElementsByTagName('*');

    for (let element of elements) {
        if (element.children.length === 0) {
            const match = element.textContent.match(urlPattern);
            if (match) {
                const idValue = match[1];
                const qrCode1 = document.createElement('img');
                const qrCode2 = document.createElement('img');

                qrCode1.src = `https://api.qrserver.com/v1/create-qr-code/?data=${idValue}|${currentTime}|QD`;
                qrCode2.src = `https://api.qrserver.com/v1/create-qr-code/?data=${idValue}|${currentTime}|签退`;

                element.innerHTML += `|${currentTime}|QD是签到二维码`;
                element.appendChild(qrCode1);
                element.innerHTML += `|${currentTime}|签退是签退二维码`;
                element.appendChild(qrCode2);
            }
        }
    }
});