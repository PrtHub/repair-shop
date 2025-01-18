import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomer(id: number) {
    try {
      const customer = await db
        .select()
        .from(customers)
        .where(eq(customers.id, id))
        .limit(1);
        
      return customer[0];
    } catch (error) {
      console.log("Error getting customer", error);
    }
}