import * as sapper from "@sapper/server";

import { NODE_ENV, PORT } from "./config.js";

import compression from "shrink-ray-current";
import polka from "polka";
import sirv from "sirv";

const dev = NODE_ENV === "development";

polka()
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, error => {
    if (error) console.log("error", error);
  });
