var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/gateway/Events.ts
var init_Events = __esm({
  "src/gateway/Events.ts"() {
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

// src/client/events/EventsManager.ts
var EventsManager_exports = {};
__export(EventsManager_exports, {
  EventsManager: () => EventsManager
});
module.exports = __toCommonJS(EventsManager_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EventsManager
});
