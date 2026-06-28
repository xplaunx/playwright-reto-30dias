export class Environment {

    static readonly ADMIN_USERNAME = Environment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Environment.getRequired('ADMIN_PASSWORD')

    static readonly EMPLOY_USERNAME = Environment.getRequired('EMPLOY_USERNAME')
    static readonly EMPLOY_PASSWORD = Environment.getRequired('EMPLOY_PASSWORD')

    private static getRequired(key: string) : string{
        const value = process.env[key]

        if(!value){
            throw new Error('Environment variable '+ key + 'does not exist')
        }

        return value
    }

}