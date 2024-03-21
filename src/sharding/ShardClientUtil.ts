import { Client } from "../client/Client";

export class ShardClientUtil {
    client: Client
    
    constructor(client) {
        this.client = client;
    }

    static _singleton: ShardClientUtil
    static singleton(client) {
        if (!this._singleton) {
            this._singleton = new this(client);
        }

        return this._singleton;
    }
}