import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject('field')
export class Field {
    @JsonProperty('name', String)
    name!: string;
}