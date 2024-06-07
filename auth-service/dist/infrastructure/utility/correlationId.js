"use strict";
// correlationId.ts
// export const generateCorrelationId = (): string => {
//   return (
//     Math.random().toString() +
//     Math.random().toString() +
//     Math.random().toString()
//   );
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCorrelationId = void 0;
// src/infrastructure/utility/correlationId.ts
const uuid_1 = require("uuid");
const generateCorrelationId = () => {
    return (0, uuid_1.v4)();
};
exports.generateCorrelationId = generateCorrelationId;
