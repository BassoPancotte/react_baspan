import Bapi from "./bapi"
import { getService } from "./services"

export default (user: string, password: string) => {
    const service = getService('login', undefined);
    if (service !== undefined) {
        Bapi.post(undefined, undefined, service, {
            "serviceName": service?.serviceName,
            "requestBody": {
                "NOMUSU": {
                    "$": `${user}`
                },
                "INTERNO": {
                    "$": `${password}`
                }
            }
        })
    }
}