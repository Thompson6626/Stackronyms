"use server";

import {db} from "@/drizzle/db";
import {Technology} from "@/features/technologies/types/technologies";

// Get all or get filtered by name prefix
export async function getTechnologies(namePrefix?: string): Promise<Technology[]> {

    return db.query.Technologies.findMany({
        columns: { id: true, name: true },
        where: namePrefix ?
            (technologies, { ilike }) => ilike(technologies.name, `${namePrefix}%`)
            : undefined
    });
}