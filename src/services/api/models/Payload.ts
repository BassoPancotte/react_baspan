import Service from "./Service";

export default interface Payload {
    serviceName: Service["serviceName"];
    requestBody: Object
}