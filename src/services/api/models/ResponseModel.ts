export default interface ResponseModel {
    serviceName: string;
    status: string | number;
    pendingPrinting: string | boolean;
    transactionId: string;
    responseBody: Object
    statusMessage: string;
}