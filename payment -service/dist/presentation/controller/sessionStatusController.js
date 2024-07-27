"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStatusController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const sessionStatusController = (dependencies) => {
    const { useCases: { getSessionByIdUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const stripe = new stripe_1.default(process.env.STRIPE_SK);
            const sessionId = req.query.session_id;
            if (!sessionId) {
                return res
                    .status(400)
                    .json({ success: false, message: "Invalid session ID" });
            }
            const session = yield stripe.checkout.sessions.retrieve(sessionId);
            res
                .status(200)
                .json({ success: true, data: session, message: "Session verified!" });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.sessionStatusController = sessionStatusController;