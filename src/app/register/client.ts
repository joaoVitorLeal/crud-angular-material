import { v4 as uuid} from 'uuid'

export class Client {
    id?: string;
    name?: string;
    cpf?: string;
    birthDate?: string;
    email?: string;

 
    static newClient(): Client {
        const client = new Client();
        client.id = uuid()
        return client
    }
}