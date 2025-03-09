"use server";

import {db} from "@/drizzle/db";
import {Technology} from "@/features/technologies/types/technologies";

export async function getTechnologies(name?: string): Promise<Technology[]> {

    return db.query.Technologies.findMany({
        columns: { id: true, name: true },
        where: name ?
            (technologies, { ilike }) => ilike(technologies.name, `${name}%`)
            : undefined
    });
}