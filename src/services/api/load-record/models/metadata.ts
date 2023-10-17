import { JsonObject, JsonProperty } from "json2typescript";
import { Fields } from "./fields";

@JsonObject('metadata')
export class Metadata {
    @JsonProperty('fields', Fields)
    fields!: Fields;
}