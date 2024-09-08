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
exports.downloadTransationsPdfController = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const downloadTransationsPdfController = (dependencies) => {
    const { useCases: { downloadTransationsUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            if (!startDate || !endDate) {
                return res
                    .status(400)
                    .json({ error: "Start date and end date are required" });
            }
            const transactions = yield downloadTransationsUseCase(dependencies).execute(startDate, endDate);
            if (!transactions || transactions.length === 0) {
                return res
                    .status(404)
                    .json({ message: "No transactions found for the given date range" });
            }
            const doc = new pdfkit_1.default();
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=transactions.pdf");
            doc.pipe(res);
            doc.fontSize(18).text("Transactions Report", { align: "center" });
            doc.moveDown();
            transactions.forEach((transaction) => {
                doc.fontSize(12).text(`
        Course: ${transaction.courseId.courseName}
        User: ${transaction.userId.firstName} ${transaction.userId.lastName}
        Amount: ${transaction.amount}
        Method: ${transaction.method}
        Date: ${formatDate(transaction.createdAt)}
        Status: ${transaction.status}
      `);
                doc.moveDown();
            });
            doc.end();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.downloadTransationsPdfController = downloadTransationsPdfController;
function formatDate(date) {
    if (!date) {
        return "N/A";
    }
    const dateObject = date instanceof Date ? date : new Date(date);
    return dateObject.toLocaleDateString();
}
