import Bapi, { QueryParams } from "../core/bapi"
import ResponseModel from "../models/ResponseModel";

export type ResponseQueryExecutor = {
    fieldsMetadata: {
        name: string,
        description: string,
        order: number,
        userType: string
    }[],
    rows: Array<Array<string>>
}

export class QueryExecutor {

    private response: ResponseModel | undefined;
    private responseTranslated: Array<Record<string, any>> = [];
    private actualIndex = 0;

    async executeQuery(query: string): Promise<void> {
        const serviceName = 'DbExplorerSP.executeQuery'
        const payload = {
            "serviceName": serviceName,
            "requestBody": {
                "sql": query
            }
        }

        const queryParams = new QueryParams();
        queryParams.setParam('serviceName', serviceName);
        queryParams.setParam('outputType', 'json');

        await Bapi.post(undefined, queryParams, payload).then(
            (result) => {
                if (result.status == 1) {
                    this.response = result;
                    this.actualIndex = 0;
                    this.translateResponseModel();
                } else {
                    throw new Error("Não foi possível executar a query.");

                }
            }
        );
    }

    private translateResponseModel() {
        if (typeof this.response != 'undefined') {
            const responseQuery = this.response.responseBody as ResponseQueryExecutor
            const fieldsMetadata = responseQuery.fieldsMetadata;
            const rows = responseQuery.rows;

            rows.forEach((element) => {
                const obj = Object();

                element.forEach((e, index) => {

                    const field = fieldsMetadata.find((i) => {
                        return i["order"] == index + 1
                    })

                    if (typeof field != 'undefined') {
                        obj[field["name"]] = e
                    }

                })

                this.responseTranslated.push(obj);
            })
        }
    }

    getResponseModel(): ResponseModel | undefined { return this.response }
    getResponseTranslated(): Array<Object> { return this.responseTranslated }
    next(): boolean {
        if (this.actualIndex < this.responseTranslated.length) {
            this.actualIndex++
            return true
        }
        else return false
    }
    getField(nameField: string) {
        try {
            return (this.responseTranslated[this.actualIndex - 1])[nameField]
        } catch {
            return ''
        }
    }
    getFieldPerRownum(nameField: string, rownum: number): string {
        try {
            return (this.responseTranslated[rownum])[nameField]
        } catch {
            return ''
        }
    }

}