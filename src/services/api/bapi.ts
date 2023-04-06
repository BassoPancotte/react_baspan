import axios from "axios";
import Payload from "./models/Payload";
import ResponseModel from "./models/ResponseModel";
import ServiceModel from './models/Service'

export default class Bapi {
    static origin: string;
    static jsessionid: string;

    constructor() {
        Bapi.origin = top!.document.location.origin;
        Bapi.jsessionid = (top!.document.cookie.split(";").reduce((ac, cv) => Object.assign(ac, { [cv.split('=')[0]]: cv.split('=')[1] }), {})) as any["JSESSIONID"];
    };


    static post = async (
        path: string | URL["pathname"] = '/mge/service.sbr'
        , searchParams: string | URL["searchParams"] = ''
        , service: ServiceModel
        , payload: Payload | Payload["requestBody"],

    ): Promise<ResponseModel> => {
        const url = new URL(`${Bapi.origin}/${path}${searchParams === '' ? '?' : `${searchParams}&`}serviceName=${service.serviceName}&outputType=${service.outputType}`)
        const response = await axios.post(url.href, JSON.stringify(payload));

        return JSON.parse(response.data) as ResponseModel
    };

}