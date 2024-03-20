var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/gateway/Events.ts
var Events;
var init_Events = __esm({
  "src/gateway/Events.ts"() {
    Events = /* @__PURE__ */ ((Events2) => {
      Events2["ClientReady"] = "READY";
      Events2["GuildCreate"] = "GUILD_CREATE";
      Events2["GuildUpdate"] = "GUILD_UPDATE";
      Events2["GuildDelete"] = "GUILD_DELETE";
      return Events2;
    })(Events || {});
  }
});

// src/client/events/Ready.ts
var Ready_exports = {};
__export(Ready_exports, {
  default: () => Ready_default
});
function Ready_default(client, data) {
  client.emit("READY" /* ClientReady */, data);
}
var init_Ready = __esm({
  "src/client/events/Ready.ts"() {
    init_Events();
  }
});

// src/client/events/GuildCreate.ts
var GuildCreate_exports = {};
__export(GuildCreate_exports, {
  default: () => GuildCreate_default
});
function GuildCreate_default(client, data) {
  client.guilds.cache.set(data.id, data);
  client.emit("GUILD_CREATE" /* GuildCreate */, data);
}
var init_GuildCreate = __esm({
  "src/client/events/GuildCreate.ts"() {
    init_Events();
  }
});

// src/client/events/GuildUpdate.ts
var GuildUpdate_exports = {};
__export(GuildUpdate_exports, {
  default: () => GuildUpdate_default
});
function GuildUpdate_default(client, data) {
  client.guilds.cache.set(data.id, data);
  client.emit("GUILD_CREATE" /* GuildCreate */, data);
}
var init_GuildUpdate = __esm({
  "src/client/events/GuildUpdate.ts"() {
    init_Events();
  }
});

// src/client/events/GuildDelete.ts
var GuildDelete_exports = {};
__export(GuildDelete_exports, {
  default: () => GuildDelete_default
});
function GuildDelete_default(client, data) {
  client.guilds.cache.delete(data.id);
  client.emit("GUILD_DELETE" /* GuildDelete */, data);
}
var init_GuildDelete = __esm({
  "src/client/events/GuildDelete.ts"() {
    init_Events();
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Client: () => Client,
  Events: () => Events,
  GatewayIntentBits: () => GatewayIntentBits
});
module.exports = __toCommonJS(src_exports);

// src/client/Client.ts
var import_ws = require("ws");
var import_events = require("events");

// src/client/events/EventsManager.ts
var EventsManager = class {
  constructor(client) {
    this.events = [];
    this.client = client;
    (async () => {
      this.register("READY", (await Promise.resolve().then(() => (init_Ready(), Ready_exports))).default);
      this.register("GUILD_CREATE", (await Promise.resolve().then(() => (init_GuildCreate(), GuildCreate_exports))).default);
      this.register("GUILD_UPDATE", (await Promise.resolve().then(() => (init_GuildUpdate(), GuildUpdate_exports))).default);
      this.register("GUILD_DELETE", (await Promise.resolve().then(() => (init_GuildDelete(), GuildDelete_exports))).default);
    })();
  }
  register(name, handler) {
    this.events[name] = handler;
  }
};

// src/rest.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
function getGatewayBot(token) {
  return (0, import_node_fetch.default)("https://discord.com/api/v9/gateway/bot", {
    headers: {
      Authorization: `Bot ${token}`
    }
  }).then(async (res) => await res.json());
}

// src/client/Client.ts
var Client = class extends import_events.EventEmitter {
  // TODO: Type this motherchunker
  constructor(options) {
    super();
    this.eventsManager = new EventsManager(this);
    this.guilds = {
      cache: /* @__PURE__ */ new Map()
    };
    this.options = options;
  }
  async login(token) {
    return new Promise(async (resolve, reject) => {
      console.log(
        await getGatewayBot(token)
      );
      this.ws = new import_ws.WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
      this.ws.on("message", (d) => {
        const data = JSON.parse(d.toString());
        switch (data.op) {
          case 0:
            const event = this.eventsManager.events[data.t];
            if (event)
              event(this, data.d);
            break;
          case 10:
            this.ws.send(JSON.stringify({
              op: 2,
              d: {
                token,
                intents: this.options.intents.reduce((acc, cur) => acc | cur, 0),
                properties: {
                  $os: process.platform,
                  $browser: "light-discord",
                  $device: "light-discord"
                }
              }
            }));
            setInterval(() => {
              this.ws.send(JSON.stringify({
                op: 1,
                d: null
              }));
            }, data.d.heartbeat_interval);
            resolve();
            break;
        }
      });
    });
  }
};

// src/gateway/GatewayIntentBits.ts
var GatewayIntentBits = /* @__PURE__ */ ((GatewayIntentBits2) => {
  GatewayIntentBits2[GatewayIntentBits2["Guilds"] = 1] = "Guilds";
  return GatewayIntentBits2;
})(GatewayIntentBits || {});

// src/index.ts
init_Events();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Client,
  Events,
  GatewayIntentBits
});
