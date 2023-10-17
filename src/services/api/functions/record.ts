import Bapi, { QueryParams } from "../core/bapi"
import ResponseModel from "../models/ResponseModel"

export type RecordType = {
    fieldName: string,
    value: string
}

type RecordFields = Record<string, { $: string }>

type ResponseServiceProvider = {
    entities: {
        total: string,
        entity: RecordFields
    }
}

export default class RecordSnk {

    private response: ResponseModel | undefined;
    private responseTranslated: Record<string, string> = {}
    private offsetPage: number = 0;

    async load(entityName: string, where: string, responseFields?: Array<string>,) {
        this.response = undefined;
        this.responseTranslated = {};

        const responseFieldsJoined: string = (responseFields?.join(",") != undefined ? responseFields.join(",") : "")

        const serviceName = 'CRUDServiceProvider.loadRecords'
        const payload = {
            serviceName: serviceName,
            requestBody: {
                dataSet: {
                    rootEntity: entityName,
                    offsetPage: this.offsetPage,
                    "criteria": {
                        "expression": {
                            "$": where
                        }
                    },
                    "entity": {
                        "fieldset": {
                            "list": responseFieldsJoined
                        }
                    }
                }
            }
        }




    }

    async update(entityName: string, primaryKeys: RecordType[], records: RecordType[], responseFields?: Array<string>): Promise<void> {
        this.response = undefined;
        this.responseTranslated = {};

        var pks: RecordFields = {};


        primaryKeys.forEach((e: RecordType) => {
            pks[e["fieldName"]] = { "$": e["value"] }
        })

        var recs: RecordFields = {}

        records.forEach((e: RecordType) => {
            recs[e["fieldName"]] = { "$": e["value"] }
        })

        const responseFieldsJoined: string = (responseFields?.join(",") != undefined ? responseFields.join(",") : "")

        const serviceName = 'CRUDServiceProvider.saveRecord'
        const payload = {
            serviceName: serviceName,
            requestBody: {
                dataSet: {
                    rootEntity: entityName,
                    includePresentationFields: "S",
                    dataRow: {
                        localFields: recs,
                        key: pks,
                    },
                    entity: {
                        fieldset: {
                            list: responseFieldsJoined
                        }
                    }
                }
            }
        }

        const queryParams = new QueryParams();
        queryParams.setParam('serviceName', serviceName);
        queryParams.setParam('outputType', 'json');

        await Bapi.post(undefined, queryParams, payload)
            .then((result) => {
                this.response = result;
                this.translateResponseModel();
            })
    }

    private translateResponseModel() {
        if (typeof this.response != 'undefined') {
            const response = this.response.responseBody as ResponseServiceProvider
            const entities = response.entities.entity;

            for (const key in entities) {
                this.responseTranslated[key] = entities[key]["$"]
            }
        }
    }

    getFieldResponse(nameField: string) {
        try {
            return this.responseTranslated[nameField]
        } catch {
            return ''
        }
    }

}
