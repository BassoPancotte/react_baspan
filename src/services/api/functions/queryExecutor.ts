import Bapi from "../core/bapi"
export default async (query: string) => {

    const serviceName = 'DbExplorerSP.executeQuery;'
    const payload = {
        "serviceName": serviceName,
        "requestBody": {
            "sql": "select * from tgfven"
        }
    }

    const result = await Bapi.post(undefined, `?serviceName=${serviceName}&outputTypejson`, payload);

}