import { parentPort, workerData } from "worker_threads";
import { Client } from "../client/Client";

export class ShardClientUtil {
    client: Client
    
    constructor(client: Client) {
        this.client = client;

        parentPort?.on("message", (message) => {
            if (message._fetchProp) {
                const props = message._fetchProp.split(".");
                let value: any = this.client;

                for (const prop of props) {
                    value = value[prop];
                }

                parentPort?.postMessage({
                    _fetchProp: message._fetchProp,
                    _result: value
                })
            }
        })
    }

    static _singleton: ShardClientUtil
    static singleton(client: Client) {
        if (!this._singleton) {
            this._singleton = new this(client);
        }

        return this._singleton;
    }

    // this.fetchClientValues -> (first) Shard worker listener -> ShardingManager.fetchClientValues ->
    // target shard.fetchClientValue -> this parentPort listener -> post message back to the first shard (with the result) -> 
    // return promise from the first shard.fetchClientValue -> return promise from ShardingManager.fetchClientValues -> return promise from this.fetchClientValues
    // kinda hardcoded, but couldn't think of a better way to do this
    fetchClientValues(prop: string, shardId?: number) {
        return new Promise((resolve, reject) => {
            const listener = (d: any) => {
                if (d._fetchProp && d._result) {
                    resolve(d._result)

                    if (listener) parentPort?.removeListener("message", listener)
                }
            };

            parentPort?.on("message", listener);

            parentPort?.postMessage({
                _sFetchProp: prop,
                _sFetchPropShard: shardId
            });
        });
    }
}