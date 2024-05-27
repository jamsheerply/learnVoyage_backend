"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCorrelationId = void 0;
// correlationId.ts
const generateCorrelationId = () => {
    return (Math.random().toString() +
        Math.random().toString() +
        Math.random().toString());
};
exports.generateCorrelationId = generateCorrelationId;
