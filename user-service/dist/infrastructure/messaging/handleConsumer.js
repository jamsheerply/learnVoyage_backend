"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConsumer = void 0;
const handleConsumer = (msgType, message) => {
    switch (msgType) {
        case "addUser":
            const messageParse = JSON.parse(message);
            console.log(messageParse);
    }
};
exports.handleConsumer = handleConsumer;
