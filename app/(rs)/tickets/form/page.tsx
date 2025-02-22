import BackButton from "@/components/back-button";
import { getCustomer } from "@/lib/queries/getCustomers";
import { getTicket } from "@/lib/queries/getTickets";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "./ticket-form";
import { getKindeServerSession,  } from "@kinde-oss/kinde-auth-nextjs/server";
import { init as KindeInit, Users } from "@kinde/management-api-js";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId) {
    return {
      title: "Missing Customer or Ticket ID",
    };
  }

  if(customerId){
    const customer = await getCustomer(parseInt(customerId));
    return {
      title: `New Ticket for - ${customer?.firstName} ${customer?.lastName}`
    }
  }

  if(ticketId){
    const ticket = await getTicket(parseInt(ticketId));
    return {
      title: `Edit Ticket - #${ticket?.id}`
    }
  }
};


const TicketFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <div>
          <h2 className="text-2xl font-bold">Ticket and Customer not found</h2>
          <BackButton title="Go Back" variant="default" />
        </div>
      );
    }

    const { getUser, getPermission } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);

    const isManager = managerPermission?.isGranted;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <div>
            <h2 className="text-2xl font-bold">Customer not found</h2>
            <BackButton title="Go Back" variant="default" />
          </div>
        );
      }

      if (!customer.active) {
        return (
          <div>
            <h2 className="text-2xl font-bold">Customer is inactive</h2>
            <BackButton title="Go Back" variant="default" />
          </div>
        );
      }
      
      if(isManager){
          KindeInit();
          const { users } = await Users.getUsers()
          const techs = users ?  users.map((user) => ({ id: user.email!, description: user.email! })) : [];

          return <TicketForm customer={customer} techs={techs} />
      } else { 
        return <TicketForm customer={customer} />;
      }
    }

    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <div>
            <h2 className="text-2xl font-bold">Ticket not found</h2>
            <BackButton title="Go Back" variant="default" />
          </div>
        );
      }

      if (ticket) {
        const customer = await getCustomer(ticket?.customerId);

        if(isManager){
          KindeInit();
          const { users } = await Users.getUsers()
          const techs = users ?  users.map((user) => ({ id: user.email!, description: user.email! })) : [];
          return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
        } else {
          const isEditable = user?.email?.toLowerCase() === ticket?.tech?.toLowerCase();
          return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />;
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      console.log("Error ticket form page: ", error);
    }
  }
};

export default TicketFormPage;
