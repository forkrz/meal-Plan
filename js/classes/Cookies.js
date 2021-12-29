export class Cookies {

    setCookie(cname, cvalue) {
        const d = new Date();
        d.setTime(d.getTime() + (3600 * 2000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        setTimeout(function() { location.href = "http://mp.localhost/index.html" }, 10000);

    }

    getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    eraseCookie(cname) {
        document.cookie = cname + '=; Max-Age=-99999999;';
        setTimeout(function() { location.href = "http://mp.localhost/index.html" }, 5000);
    }

    isCookieSet = (cname) => {
        if (this.getCookie(cname) != "") {
            return true;
        } else {
            return false;
        }
    }

}