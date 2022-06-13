import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    define: {
      __APP_ENV__: env,
    },
  });
};
