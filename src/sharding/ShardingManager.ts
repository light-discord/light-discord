import { EventEmitter } from 'events';
import { ShardingOptions } from './ShardingOptions';
import { getGatewayBot } from '../rest';
import { Shard } from './Shard';

export class ShardingManager extends EventEmitter {
    script: string;
    options: ShardingOptions;

    totalShards?: number;
    shards: Shard[] = [];

    constructor(script: string, options: ShardingOptions) {
        super();

        this.script = script;
        this.options = options;
    }

    async spawn() {
        const gateway = await getGatewayBot(this.options.token);
        this.totalShards = gateway.shards;

        if (!this.totalShards) {
            throw new Error('Failed to get total number of shards from Discord.');
        }

        for (let i = 0; i < this.totalShards; i++) {
            this.shards[i] = new Shard(this, i);
            this.shards[i].spawn();
        }
    }

    fetchClientValues(prop: string, shard: number) {
        if (typeof shard == "number") {
            return this.shards[shard].fetchClientValue(prop);
        }

        return Promise.all(this.shards.map(s => s.fetchClientValue(prop)));
    }
}