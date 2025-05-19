import {Environment} from "../../core/src/env.validation";

export const isLocal = () => process.env.NODE_ENV === Environment.Local
export const isNotLocal = () => process.env.NODE_ENV !== Environment.Local
export const isNotProduction = () => process.env.NODE_ENV !== Environment.Production
