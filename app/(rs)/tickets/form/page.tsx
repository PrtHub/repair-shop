import BackButton from "@/components/back-button";
import { getCustomer } from "@/lib/queries/getCustomers";
import { getTicket } from "@/lib/queries/getTickets";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "./ticket-form";


const TicketFormPage = async ({
    searchParams
}: {
    searchParams: Promise<{[key: string]: string | undefined}>
}) => {
    try {
        const { customerId, ticketId } = await searchParams;

        if (!customerId && !ticketId) {
            return (
                <div>
                    <h2 className="text-2xl font-bold">Ticket and Customer not found</h2>
                    <BackButton title="Go Back" variant="default" />
                </div>
            )
        }

        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <div>
                        <h2 className="text-2xl font-bold">Customer not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </div>
                )
            }

            if (!customer.active) {
                return (
                    <div>
                        <h2 className="text-2xl font-bold">Customer is inactive</h2>
                        <BackButton title="Go Back" variant="default" />
                    </div>
                )
            }

            return <TicketForm customer={customer} />
        }

        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));

            if (!ticket) {
                return(
                    <div>
                        <h2 className="text-2xl font-bold">Ticket not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </div>
                ) 
            }

            if (ticket) {
                const customer = await getCustomer(ticket?.customerId)
                return <TicketForm customer={customer} ticket={ticket} />
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error);
            console.log("Error ticket form page: ", error);
        }
    }
}

export default TicketFormPage