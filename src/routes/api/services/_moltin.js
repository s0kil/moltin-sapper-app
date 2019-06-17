import { MOLTIN_CLIENT_ID } from "../../../config.js";
import { gateway as MoltinGateway } from "@moltin/sdk";

export const Moltin = MoltinGateway({
  client_id: MOLTIN_CLIENT_ID
});
