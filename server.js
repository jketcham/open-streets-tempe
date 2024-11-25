import * as crypto from "node:crypto";
import { createRequestHandler } from "@remix-run/express";
import helmet from "helmet";
import compression from "compression";
import express from "express";
import morgan from "morgan";

const isProduction = process.env.NODE_ENV === "production";
const viteDevServer = isProduction
  ? undefined
  : await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    );

const remixHandler = createRequestHandler({
  getLoadContext: (req, res) => ({
    cspNonce: res.locals.cspNonce,
  }),
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("./build/server/index.js"),
});

const app = express();

app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
  next();
});
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": [
          "'self'",
          "https://www.googletagmanager.com/",
          (req, res) => `'nonce-${res.locals.cspNonce}'`,
        ],
        "connect-src": [
          "'self'",
          "https://www.google-analytics.com/",
          () => (isProduction ? "" : "ws://localhost:24678"),
        ],
        "img-src": ["'self'", "data:", "https://www.googletagmanager.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

app.use(morgan("tiny"));

// handle SSR requests
app.all("*", remixHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);
