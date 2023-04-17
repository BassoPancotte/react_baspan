import axios from "axios";
import Payload from "../models/Payload";
import ResponseModel from "../models/ResponseModel";

export default class Bapi {
    private static origin: string;
    private static jsessionid: string;

    constructor(origin: string | undefined, jsessionid: string | undefined) {
        Bapi.origin = origin === undefined ? top!.document.location.origin : origin;
        Bapi.jsessionid = jsessionid === undefined ? (top!.document.cookie.split(";").reduce((ac, cv, i) => Object.assign(ac, { [cv.split('=')[0]]: cv.split('=')[1] }), {})) as any["JSESSIONID"] : jsessionid;
    };


    static post = async (
        path: string | URL["pathname"] = 'mge/service.sbr'
        , othersParams: string = ''
        , payload: Payload,

    ): Promise<ResponseModel> => {
        const url = `${Bapi.origin}/${path}${othersParams}`
        const response = await axios.post(url, JSON.stringify(payload));

        return JSON.parse(response.data) as ResponseModel
    };

}