import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { PaymentMethod, PaymentsStatus, RentalRequestsStatus } from "../../../generated/prisma/enums";

export const handleCheckoutCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  const tenantId = session.metadata?.tenantId;
  const rentalRequestId =
    session.metadata?.rentalRequestId;

  const transactionId =
    session.payment_intent as string;

  const amount = session.metadata?.amount;

  if (
    !tenantId ||
    !rentalRequestId ||
    !transactionId ||
    !amount
  ) {
    console.error(
      "Missing payment metadata:",
      session.metadata,
    );

    return;
  }

  console.log("Processing payment:", {
    tenantId,
    rentalRequestId,
    transactionId,
    amount,
  });

  const existingPayment =
    await prisma.payments.findUnique({
      where: {
        rentalRequestId,
      },
    });

  if (
    existingPayment?.status ===
    PaymentsStatus.COMPLETED
  ) {
    console.log("Payment already completed.");

    return;
  }

  await prisma.rentalRequests.update({
    where: {
      id: rentalRequestId,
    },
    data: {
      status: RentalRequestsStatus.PAID,
    },
  });

  await prisma.payments.upsert({
    where: {
      rentalRequestId,
    },
    update: {
      transactionId,
      status: PaymentsStatus.COMPLETED,
      paidAt: new Date(),
    },
    create: {
      rentalRequestId,
      transactionId,
      amount: Number(amount),
      method: PaymentMethod.CARD,
      status: PaymentsStatus.COMPLETED,
      paidAt: new Date(),
    },
  });

  console.log(
    "Payment completed successfully:",
    rentalRequestId,
  );
};
