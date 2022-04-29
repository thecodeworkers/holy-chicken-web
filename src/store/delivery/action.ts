import { actionObject } from "@utils";
import { SAVE_DELIVERY } from "./actions-types";

export const saveDelivery = (payload) => actionObject(SAVE_DELIVERY, payload)
