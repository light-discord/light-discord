import { Worker } from "worker_threads";
import { ShardingManager } from "./ShardingManager";

export class Shard { 
    id: number;
    worker?: Worker;
    manager: ShardingManager;
    workerData: Object;

    constructor(manager: ShardingManager, id: number) {
        this.manager = manager;
        this.id = id;

        this.workerData = {
            SHARDING_MANAGER: true,
            SHARDS: this.id,
            SHARD_COUNT: this.manager.totalShards,
            DISCORD_TOKEN: this.manager.options.token
        }
    }

    spawn() {
        this.worker = new Worker(this.manager.script, { workerData: this.workerData });

        this.worker.on("message", (d) => {
            if (d._sFetchProp) {
                this.manager.fetchClientValues(d._sFetchProp, d._sFetchPropShard).then((result) => {
                    this.worker?.postMessage({
                        _fetchProp: d._sFetchProp,
                        _result: result
                    })
                })
            }
        })
    }

    fetchClientValue(prop: string) {
        return new Promise((resolve, reject) => {
            const listener = (d: any) => {
                if (d._fetchProp && d._result) {
                    resolve(d._result)

                    if (listener) this.worker?.removeListener("message", listener)
                }
            }

            this.worker?.on("message", listener)

            this.worker?.postMessage({
                _fetchProp: prop
            })
        })
    }
}