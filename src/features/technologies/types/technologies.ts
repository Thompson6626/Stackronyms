import {InferSelectModel} from "drizzle-orm";
import {Technologies} from "@/drizzle/schema";


export type Technology = InferSelectModel<typeof Technologies>;
