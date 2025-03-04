import { pgTable, text, uuid } from "drizzle-orm/pg-core";


export const Technologies = pgTable("technologies",{
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique()
});