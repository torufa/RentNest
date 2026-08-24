import Stripe from "stripe";
import { PaymentsStatus, RentalRequestsStatus } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";import { stripe } from "../../lib/stripe";
import { handleCheckoutCompleted } from "./payments.utils";
;

const createPaymentSessionIntoDB = async(tenantId: string, rentalRequestId: string) => {
    const rentalRequest = await prisma.rentalRequests.findUniqueOrThrow({
        where: {id: rentalRequestId},
        include: {
            customer: true,
            property: true,
            payments: true
        }
    })
    if(rentalRequest.customerId !== tenantId){
        throw new Error("This rental request is not yours.")
    }
    if(rentalRequest.status !== RentalRequestsStatus.APPROVED){
        throw new Error(`Only approved rental requests can be paid. Current status: ${rentalRequest.status}`)
    }
    if (rentalRequest.payments?.status === PaymentsStatus.COMPLETED) {
        throw new Error("Payment has already been completed.");
    }        

    const session = await stripe.checkout.sessions.create({
        line_items:[{
            price_data: {
                currency: "usd",
                product_data: {
                    name: rentalRequest.property.propertyName,
                    description: "Thanks for renting with RentNest!"
                },
                unit_amount:
                    Number(rentalRequest.property.price) * 100
            },
            quantity: 1
        }],
        mode: "payment",
        customer_email : rentalRequest.customer.email,
        payment_method_types: ["card"],
        success_url: `${config.APP_URL}/premium?success=true&rentalRequestId=${rentalRequestId}`,
        cancel_url: `${config.APP_URL}/payment?success=false`,
        metadata: {
            tenantId,
            rentalRequestId,
            amount: rentalRequest.property.price.toString()
        }
    })

    if(!session.url){
        throw new Error("Failed to create payment session.")
    }
    return{
        paymentUrl: session.url
    }
}

const handleWebhook = async(payload: Buffer, signature: string) => {
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
        payload,
        signature,
        config.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        throw new Error("Invalid webhook signature.");
    }
  console.log("STRIPE WEBHOOK EVENT:", event.type);
    switch (event.type) {
        case 'checkout.session.completed':
            await handleCheckoutCompleted(event.data.object)
            break;
        default:
        console.log(`Unhandled event type ${event.type}.`);
    }
}

const getTenantPaymentsFromDB = async(tenantId: string) => {
    const payments = await prisma.payments.findMany({
    where: {
        rental: {
            customerId: tenantId,
        },
    },
    include: {
        rental: {
            include: {
                property: true,
            },
        },
    },
});

    const countPayments = payments.length
    return {
        total: countPayments,
        payment: payments
    }
}

const getTenantPaymentsByIdFromDB = async(tenantId: string, paymentId: string) => {
    const result = await prisma.payments.findFirst({
        where: {
            id: paymentId,
            rental: {
                customerId: tenantId
            }
        },
        include: {
            rental: {include: {
                property: {include: {
                    category: true
                }}
            }}
        }
    })
    if (!result) {
        throw new Error("Payment not found.");
    }

    return result
}

export const paymentsService = {
    createPaymentSessionIntoDB,
    handleWebhook,
    getTenantPaymentsFromDB,
    getTenantPaymentsByIdFromDB
}