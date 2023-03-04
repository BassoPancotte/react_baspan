export default class BaspanAPI {

    origin: string;
    urlbase: string;
    xhttp: XMLHttpRequest;
    jsessionid: string;

    constructor(
        url: string | URL = new URL(window.location.href),
        path: string = '/mge',
        params: string | URLSearchParams = "",
        jsessionid: string = (document.cookie.split(";").reduce((ac, cv, i) => Object.assign(ac, { [cv.split('=')[0]]: cv.split('=')[1] }), {}) as any)["JSESSIONID"]
    ) {
        if (typeof url === 'string') {
            url = new URL(url)
        }
        if (typeof params === 'string') {
            params = new URLSearchParams(params);
        }


        this.origin = url.origin;
        this.urlbase = this.origin + path + params;
        this.jsessionid = jsessionid;


        this.xhttp = new XMLHttpRequest();

    }

    setBaseURL(path: string = '/mge', params: string | URLSearchParams) {
        this.urlbase = this.origin + path + params;
        return this;
    }

    post = (payload: string | object) => {
        this.xhttp.open("POST", this.urlbase, true);
        this.xhttp.setRequestHeader("Accept", "*/*");
        this.xhttp.setRequestHeader("JSESSIONID", this.jsessionid);
        this.xhttp.send(JSON.stringify(payload));


        return new Promise((resolve, reject) => {

            this.xhttp.onload = () => {

                let status = this.xhttp.status;
                let readyState = this.xhttp.readyState


                if (readyState == 4 && status == 200) {
                    resolve(this.xhttp.response);
                }
                else {
                    reject([status, readyState]);
                }
            }
        });

    }

}