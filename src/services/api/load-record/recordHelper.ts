import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import Bapi, { QueryParams } from "../core/bapi";
import { LoadRecord } from "./models/load-records-model";


export default class RecordHelper {

    static async loadRecord(entityName: string, where: string = "", responseFields?: Array<string>, pageNumber: number = 1): Promise<LoadRecord | never> {
        const responseFieldsJoined: string = (responseFields?.join(",") != undefined ? responseFields.join(",") : "")

        const serviceName = 'CRUDServiceProvider.loadRecords'
        const payload = {
            serviceName: serviceName,
            requestBody: {
                dataSet: {
                    rootEntity: entityName,
                    offsetPage: pageNumber,
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


        const queryParams = new QueryParams();
        queryParams.setParam('serviceName', serviceName);
        queryParams.setParam('outputType', 'json');

        const object = await Bapi.post(undefined, queryParams, payload)


        let jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.operationMode = OperationMode.ENABLE;
        jsonConvert.ignorePrimitiveChecks = true;
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;


        let loadRecord: LoadRecord = new LoadRecord();
        try {
            loadRecord = jsonConvert.deserializeObject(object.responseBody, LoadRecord);
            loadRecord.where = where;
            loadRecord.rootEntity = entityName;
        } catch (e) {
            throw <Error>e;
        }

        return loadRecord;
    }

}