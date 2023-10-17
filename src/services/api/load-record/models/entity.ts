import { Any, JsonObject, JsonProperty } from "json2typescript";

@JsonObject('entity')
export class Entity {
    @JsonProperty('entity', [Any])
    entity!: Any[];
}