import Bapi from "../core/bapi"
import ResponseModel from "../models/ResponseModel";
export default async (query: string): Promise<ResponseModel["responseBody"]> => {

    const serviceName = 'DbExplorerSP.executeQuery'
    const payload = {
        "serviceName": serviceName,
        "requestBody": {
            "sql": "select * from tgfven"
        }
    }

    const result = await Bapi.post(undefined, `?serviceName=${serviceName}&outputTypejson`, payload);
    return result["responseBody"];
}