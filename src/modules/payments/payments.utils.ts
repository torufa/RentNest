import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { PaymentMethod, PaymentsStatus, RentalRequestsStatus } from "../../../generated/prisma/enums";



export const handleCheckoutCompleted = async( session : Stripe.Checkout.Session) =>{
    const tenantId = session.metadata?.tenantId as string
    const rentalRequestId = session.metadata?.rentalRequestId as string;
    const transactionId = session.payment_intent as string;
    const amount = session.metadata?.amount;    

    if(!tenantId || !rentalRequestId || !transactionId || !amount){
        return
    }

    await prisma.$transaction(async(tx)=>{
        const existingPayment = await tx.payments.findUnique({
            where:{rentalRequestId}
        })
        if(existingPayment?.status === PaymentsStatus.COMPLETED){
            return
        }

        await tx.rentalRequests.update({
            where : {id: rentalRequestId},
            data : {
                status : RentalRequestsStatus.PAID
            }
        })  
        await tx.payments.upsert({
            where : {rentalRequestId},
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
        })
    })
}

