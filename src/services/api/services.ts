import Service from "./models/Service";

const services: Array<Service> = [
    new Service({ name: 'login', serviceName: 'MobileLoginSP.login', outputTypeJson: true }),
    new Service({ name: 'killSession', serviceName: 'SessionManagerSP.killSession', outputTypeJson: true })
]

const getService = (name: Service["name"] | undefined, serviceName: Service["serviceName"] | undefined): Service | undefined => {
    for (let i of services) {
        if (i.name === name || i.serviceName === serviceName) {
            return i
        }
    }
}

export default services;
export { getService }