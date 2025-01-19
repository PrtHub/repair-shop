"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"

import {
    insertCustomerSchema,
    InsertCustomerSchemaType,
    SelectCustomerSchemaType
} from "@/lib/zod-schema/customer"

type Props = {
    customer?: SelectCustomerSchemaType
}

const CustomerForm = ({
    customer
}: Props) => {

    const form = useForm<InsertCustomerSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(insertCustomerSchema),
        defaultValues: {
            id: customer?.id || 0,
            firstName: customer?.firstName || "",
            lastName: customer?.lastName || "",
            address1: customer?.address1 || "",
            address2: customer?.address2 || "",
            city: customer?.city || "",
            state: customer?.state || "",
            email: customer?.email || "",
            zip: customer?.zip || "",
            phone: customer?.phone || "",
            notes: customer?.notes || "",
        }
    })

    const onSubmit = (data: InsertCustomerSchemaType) => {
        console.log(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <div>
                <h2 className="text-2xl font-bold">
                    {customer?.id ? "Edit" : "New"} Customer Form
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
}

export default CustomerForm