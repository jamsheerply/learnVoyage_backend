import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import PDFDocument from "pdfkit";

export const downloadTransationsPdfController = (
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

      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=transactions.pdf"
      );

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
