import { JsonObject, JsonProperty } from "json2typescript";
import { Entities } from "./entities";
import RecordHelper from "../recordHelper";

@JsonObject('LoadRecord')
export class LoadRecord {

    private index: number = 0;
    private firstNext: boolean = true;

    @JsonProperty('entities', Entities)
    entities!: Entities;

    public where: string = "";
    public rootEntity: string = "";


    public async next(): Promise<boolean> {
        if (this.index < this.entities.offset) {
            this.setNexIndex();
            return true;

        } else {
            const pageNumber: number = Number(this.entities.offsetPage) + 1
            this.entities = (await RecordHelper.loadRecord(this.rootEntity, this.where, this.entities.metadata.fields.toArray(), pageNumber)).entities

            if (this.entities.total > 0) {
                this.setNexIndex();

                return true;

            } else {
                return false;

            };
        }
    }

    private setNexIndex() {
        if (!this.firstNext) {
            this.index++
        } else {
            this.firstNext = !this.firstNext;
        }
    }


    public getString(fieldName: string): string {
        const index: number = this.entities.metadata.fields.toArray().findIndex((e) => {
            return e === fieldName;
        })

        if (this.entities.entity != null && this.entities.entity.length > 0) {
            const entityIndex = this.entities.entity[this.index];

            if (entityIndex != null) {
                const entityObject = entityIndex[`f${index}`]

                if (entityObject != null) {
                    return entityObject["$"];

                }
            }
        }

        return ""
    }

}