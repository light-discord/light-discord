var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var Events_exports = {};
__export(Events_exports, {
  Events: () => Events
});
module.exports = __toCommonJS(Events_exports);
var Events = /* @__PURE__ */ ((Events2) => {
  Events2["ClientReady"] = "READY";
  Events2["GuildCreate"] = "GUILD_CREATE";
  Events2["GuildUpdate"] = "GUILD_UPDATE";
  Events2["GuildDelete"] = "GUILD_DELETE";
  return Events2;
})(Events || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Events
});
