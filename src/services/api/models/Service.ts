export default class implements ServiceModel {
    name: string;
    serviceName: string;
    outputType: string;
    outputTypeJson: true;

    constructor(service: ServiceModel) {
        this.name = service.name;
        this.serviceName = service.serviceName;
        this.outputTypeJson = service.outputTypeJson;
        this.outputType = this.outputTypeJson ? 'json' : 'xml';
    }
}

interface ServiceModel {
    name: string;
    serviceName: string;
    outputTypeJson: true;
}