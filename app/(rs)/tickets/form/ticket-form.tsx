"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import { 
    insertTicketSchema, 
    InsertTicketSchemaType, 
    SelectTicketSchemaType 
} from "@/lib/zod-schema/ticket";
import { SelectCustomerSchemaType } from "@/lib/zod-schema/customer";

type Props = {
    ticket?: SelectTicketSchemaType
    customer?: SelectCustomerSchemaType
}

const TicketForm = ({
    ticket,
    customer
}: Props) => {

    const form = useForm<InsertTicketSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(insertTicketSchema),
        defaultValues: {
            id: ticket?.id || 0,
            customerId: ticket?.customerId || customer?.id || 0,
            title: ticket?.title || "",
            description: ticket?.description || "",
            tech: ticket?.tech ?? "new-ticket@example.com",
            completed: ticket?.completed ?? false
        }
    });


    const onSubmit = (data: InsertTicketSchemaType) => {
        console.log(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
        <div>
            <h2 className="text-2xl font-bold">
             {ticket?.id ? "Edit" : "New"} Ticket {ticket?.id ? `#${ticket.id}` : "Form"}
            </h2>
        </div>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8"
            >
                <p>{JSON.stringify(form.getValues())}</p>
            </form>
        </Form>

    </div>
    )
};

export default TicketForm;