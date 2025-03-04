import {db} from "@/drizzle/db";

import React from 'react';

export default async function TechnologiesPickList() {
    //const technologies = await getTechnologies();


    return (
<div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gray-100">
    {/* The w-full and the max-w-sm do the sizing here */}
      <div className="sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="h-full">

        </div>
      </div>
    </div>

    );
}


async function getTechnologies(name?: string) {
    if (!name) {
        return db.query.Technologies.findMany({
            columns: { id: true, name: true },
        });
    }

    return db.query.Technologies.findMany({
        columns: { id: true, name: true },
        where: (
            technologies,
            { ilike }) => ilike(technologies.name, `${name}%`
        ),
    });
}
