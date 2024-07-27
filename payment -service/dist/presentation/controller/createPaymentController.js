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
exports.createPaymentController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const createPaymentController = (dependencies) => {
    const { useCases: { createPaymentUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { courseName, description, coursePrice, courseThumbnailUrl, userId, _id, } = req.body.data;
            if (!courseName ||
                !description ||
                !coursePrice ||
                !courseThumbnailUrl ||
                !userId ||
                !_id) {
                throw new Error("Missing required product details");
            }
            const paymentData = {
                userId: userId,
                courseId: _id,
                status: "pending",
                method: "card",
                amount: coursePrice,
            };
            var result = yield createPaymentUseCase(dependencies).execute(paymentData);
            if (result) {
                console.log(result);
                const stripe = new stripe_1.default(process.env.STRIPE_SK);
                const unitAmountInCents = Math.max(Math.floor(coursePrice * 100), 50);
                const lineItem = {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: courseName,
                            description: description,
                            images: [courseThumbnailUrl],
                        },
                        unit_amount: unitAmountInCents,
                    },
                    quantity: 1,
                };
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: [lineItem],
                    mode: "payment",
                    success_url: `${process.env.FRONTEND_URL}/payment-success?paymentId=${result._id}`,
                    cancel_url: `${process.env.FRONTEND_URL}/payment-failed?paymentId=${result._id}`,
                });
                return res.status(200).json({
                    success: true,
                    id: session.id,
                    message: "payment created successfully",
                });
            }
            else {
                throw new Error("payment created failed");
            }
        }
        catch (error) {
            console.log(error === null || error === void 0 ? void 0 : error.message);
            next(error);
        }
    });
};
exports.createPaymentController = createPaymentController;
