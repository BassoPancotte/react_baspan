import { JsonConverter, JsonCustomConvert, JsonObject, JsonProperty } from "json2typescript";
import { Metadata } from "./metadata";
import { Entity } from "./entity";


@JsonConverter
class BooleanConverter implements JsonCustomConvert<boolean> {
    serialize(data: boolean): any {
        return data ? "true" : "false";
    }

    deserialize(data: any): boolean {
        return data === "true";
    }
}

@JsonConverter
class NumberConverter implements JsonCustomConvert<number> {
    serialize(data: number): any {
        return data.toString();
    }

    deserialize(data: any): number {
        return parseInt(data);
    }
}

class DynamicProperties { [key: string]: any };

@JsonObject('entities')
export class Entities {
    @JsonProperty('total', String, NumberConverter)
    total!: number;

    @JsonProperty('hasMoreResult', BooleanConverter)
    hasMoreResult!: boolean;

    @JsonProperty('offsetPage', String, NumberConverter)
    offsetPage!: number;

    @JsonProperty('offset', String, NumberConverter)
    offset!: number;

    @JsonProperty('metadata', Metadata)
    metadata!: Metadata;

    @JsonProperty('entity', [DynamicProperties], true)
    entity?: DynamicProperties[] = [];
}
