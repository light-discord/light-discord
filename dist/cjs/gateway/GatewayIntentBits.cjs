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

// src/gateway/GatewayIntentBits.ts
var GatewayIntentBits_exports = {};
__export(GatewayIntentBits_exports, {
  GatewayIntentBits: () => GatewayIntentBits
});
module.exports = __toCommonJS(GatewayIntentBits_exports);
var GatewayIntentBits = /* @__PURE__ */ ((GatewayIntentBits2) => {
  GatewayIntentBits2[GatewayIntentBits2["Guilds"] = 1] = "Guilds";
  return GatewayIntentBits2;
})(GatewayIntentBits || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GatewayIntentBits
});
