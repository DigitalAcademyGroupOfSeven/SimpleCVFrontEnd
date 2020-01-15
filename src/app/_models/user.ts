export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;

    static describe(instance): Array<string> {
        let fields = Object.getOwnPropertyNames(instance);
        return fields.slice(1, fields.length-2)        
    }
}