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
exports.downloadTransationsExcelController = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const downloadTransationsExcelController = (dependencies) => {
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
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet("Transactions");
            worksheet.columns = [
                { header: "Course", key: "course", width: 20 },
                { header: "User", key: "user", width: 20 },
                { header: "Amount", key: "amount", width: 15 },
                { header: "Method", key: "method", width: 15 },
                { header: "Date", key: "date", width: 20 },
                { header: "Status", key: "status", width: 15 },
            ];
            transactions.forEach((transaction) => {
                worksheet.addRow({
                    course: transaction.courseId.courseName,
                    user: `${transaction.userId.firstName}${transaction.userId.lastName}`,
                    amount: transaction.amount,
                    method: transaction.method,
                    date: formatDate(transaction.createdAt),
                    status: transaction.status,
                });
            });
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=transactions.xlsx");
            yield workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.downloadTransationsExcelController = downloadTransationsExcelController;
function formatDate(date) {
    if (!date) {
        return "N/A";
    }
    const dateObject = date instanceof Date ? date : new Date(date);
    return dateObject.toLocaleDateString();
}
