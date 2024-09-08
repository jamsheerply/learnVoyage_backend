import Stripe from "stripe";
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { paymentEntity } from "../../domain/entities/paymentEntity";

export const createPaymentController = (dependencies: IDependencies) => {
  const {
    useCases: { createPaymentUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        courseName,
        description,
        coursePrice,
        courseThumbnailUrl,
        userId,
        _id,
      } = req.body.data;

      if (
        !courseName ||
        !description ||
        !courseThumbnailUrl ||
        !userId ||
        !_id
      ) {
        throw new Error("Missing required product details");
      }

      const paymentData: paymentEntity = {
        userId: userId,
        courseId: _id,
        status: "pending",
        method: "card",
        amount: coursePrice,
      };

      const result = await createPaymentUseCase(dependencies).execute(
        paymentData
      );

      if (result) {
        const stripe = new Stripe(process.env.STRIPE_SK!);

        // Ensure coursePrice is properly handled
        const unitAmountInCents = coursePrice
          ? Math.max(Math.floor(coursePrice * 100), 5000)
          : 0;

        const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
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

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [lineItem],
          mode: "payment",
          success_url: `${process.env.FRONTEND_URL}/payment-success?paymentId=${result._id}`,
          cancel_url: `${process.env.FRONTEND_URL}/payment-failed?paymentId=${result._id}`,
        });

        return res.status(200).json({
          success: true,
          id: session.id,
          message: "Payment created successfully",
        });
      } else {
        throw new Error("Payment creation failed");
      }
    } catch (error: any) {
      console.error("Error creating payment:", error.message);
      next(error);
    }
  };
};
