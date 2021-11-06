export class Cookies {

    setCookie(cname, cvalue) {
        const d = new Date();
        d.setTime(d.getTime() + (3600 * 2000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}