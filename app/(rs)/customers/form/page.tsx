import BackButton from "@/components/back-button";
import { getCustomer } from "@/lib/queries/getCustomers";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "./customer-form";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { customerId } = await searchParams;

  if (!customerId) {
    return {
      title: "New Customer",
    };
  }

  const customer = await getCustomer(parseInt(customerId!));

  return {
    title: `${customer?.firstName} ${customer?.lastName}`,
  };
};

const CustomerFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  try {
    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <div>
            <h2 className="text-2xl font-bold">
              Customer with id {customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </div>
        );
      } else {
        return <CustomerForm customer={customer} />;
      }
    } else {
      return <CustomerForm />;
    }
  } catch (error) {
    console.error("Error getting customers form page: ", error);
    Sentry.captureException(error);
    return (
      <div>
        <h2 className="text-2xl font-bold">An error occurred</h2>
        <BackButton title="Go Back" variant="default" />
      </div>
    );
  }
};

export default CustomerFormPage;
