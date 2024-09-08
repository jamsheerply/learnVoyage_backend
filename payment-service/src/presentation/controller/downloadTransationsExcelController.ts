import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import ExcelJS from "exceljs";

export const downloadTransationsExcelController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { downloadTransationsUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;

      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({ error: "Start date and end date are required" });
      }

      const transactions = await downloadTransationsUseCase(
        dependencies
      ).execute(startDate, endDate);

      if (!transactions || transactions.length === 0) {
        return res
          .status(404)
          .json({ message: "No transactions found for the given date range" });
      }

      const workbook = new ExcelJS.Workbook();
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

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=transactions.xlsx"
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      next(error);
    }
  };
};

function formatDate(date: Date | string | undefined): string {
  if (!date) {
    return "N/A";
  }
  const dateObject = date instanceof Date ? date : new Date(date);
  return dateObject.toLocaleDateString();
}
