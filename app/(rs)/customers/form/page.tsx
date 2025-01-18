import BackButton from "@/components/back-button";
import { getCustomer } from "@/lib/queries/getCustomers";
import * as Sentry from "@sentry/nextjs";

const CustomerForm = async ({
    searchParams
}: {
    searchParams: Promise<{[key: string]: string | undefined}>
}) => {
    try {
        const { customerId } = await searchParams;

        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <div>
                        <h2 className="text-2xl font-bold">Customer with id {customerId} not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </div>
                );
            } else {
                return (
                    <div>
                        <h2 className="text-2xl font-bold">Customer Name: {customer.firstName} {customer.lastName}</h2>
                        <BackButton title="Go Back" variant="default" />
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <h2 className="text-2xl font-bold">Create New Customer</h2>
                    <BackButton title="Go Back" variant="default" />
                </div>
            );
        }
    } catch (error) {
        console.error("Error getting customers form page: ", error);
        Sentry.captureException(error);
    }
};

export default CustomerForm;