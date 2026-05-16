import { Type, type Static } from "@sinclair/typebox";
import { registerOrbitUserBilling, type OrbitOpenClawPluginApi } from "@orbit-0g/sdk";
import { definePluginEntry, jsonResult } from "openclaw/plugin-sdk/core";

const greetParams = Type.Object({
  name: Type.String({ description: "Name to greet" }),
});

export default definePluginEntry({
  id: "hello-world-plugin",
  name: "Hello World",
  description: "A simple hello world Orbit plugin for testing",
  register(api) {
    registerOrbitUserBilling(api as OrbitOpenClawPluginApi, {
      pluginId: process.env.ORBIT_PLUGIN_ID,
    });

    api.registerTool({
      name: "hello_world_greet",
      label: "Greet",
      description: "Returns a greeting message",
      parameters: greetParams,
      async execute(_id, params) {
        const p = params as Static<typeof greetParams>;
        return jsonResult({ ok: true, message: `Hello, ${p.name}!` });
      },
    });
  },
});
