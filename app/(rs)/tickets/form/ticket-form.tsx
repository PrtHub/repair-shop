"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import {
  insertTicketSchema,
  InsertTicketSchemaType,
  SelectTicketSchemaType,
} from "@/lib/zod-schema/ticket";
import { SelectCustomerSchemaType } from "@/lib/zod-schema/customer";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";

type Props = {
  ticket?: SelectTicketSchemaType;
  customer?: SelectCustomerSchemaType;
};

const TicketForm = ({ ticket, customer }: Props) => {
  const defaultValues = {
    id: ticket?.id || 0,
    customerId: ticket?.customerId || customer?.id || 0,
    title: ticket?.title || "",
    description: ticket?.description || "",
    tech: ticket?.tech ?? "new-ticket@example.com",
    completed: ticket?.completed ?? false,
  };

  const form = useForm<InsertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const onSubmit = (data: InsertTicketSchemaType) => {
    console.log(data);
  };

  const handleReset = () => {
    form.reset(defaultValues);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8 py-4">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? "Edit" : "New"} Ticket{" "}
          {ticket?.id ? `#${ticket.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4 md:gap-8 mt-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<InsertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
            />

            <InputWithLabel<InsertTicketSchemaType>
              fieldTitle="Tech"
              nameInSchema="tech"
              disabled={true}
            />

            <CheckboxWithLabel<InsertTicketSchemaType>
              fieldTitle="Completed"
              nameInSchema="completed"
              message="Yes"
            />
            <TextAreaWithLabel<InsertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-40"
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>

              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer?.firstName} {customer?.lastName}
              </p>
              <p>{customer?.address1}</p>
              {customer?.address2 ? <p>{customer?.address2}</p> : null}
              <p>
                {customer?.city}, {customer?.state} {customer?.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer?.email}</p>
              <p>Phone: {customer?.phone}</p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
