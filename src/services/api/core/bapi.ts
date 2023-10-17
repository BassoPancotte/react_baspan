import axios, { AxiosError } from "axios";
import Payload from "../models/Payload";
import ResponseModel from "../models/ResponseModel";

export default class Bapi {
    private static origin: string = top!.document.location.origin;

    static async post(
        path: string | URL["pathname"] = 'mge/service.sbr',
        queryParams: QueryParams,
        payload: Payload
    ): Promise<ResponseModel> {
        const url = `${Bapi.origin}/${path}?${queryParams.getParams()}`

        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: payload,
            }).then(
                (response) => {
                    const responseModel: ResponseModel = response.data
                    if (responseModel.status == "1") {
                        resolve(response.data)
                    } else {
                        reject(response.data)
                    }
                }
            )
        });
    };

}

export class QueryParams {

    headers: Params[] = [];

    public setParam(paramName: string, paramValue: string): void {
        this.headers.push(new Params(paramName, paramValue));
    };

    public getParams(): string {
        return `&${this.headers.join('&')}`
    }

}

class Params {
    param: string = "";
    value: string = "";

    public constructor(param: string, value: string) {
        this.param = param;
        this.value = value;
    }

    public toString(): string { 
        return `${this.param}=${this.value}`
    }
}