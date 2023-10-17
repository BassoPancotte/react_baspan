import { JsonObject, JsonProperty } from "json2typescript";
import { Field } from "./field";

@JsonObject('fields')
export class Fields {
    @JsonProperty('field', [Field])
    field!: Field[];

    toArray = (): string[] => {
        var fields: string[] = [];

        this.field.forEach((e, i) => {
            fields.push(e.name)
        })

        return fields;
    }
}