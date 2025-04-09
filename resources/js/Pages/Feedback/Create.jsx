import CreateComponent from "@/Components/CreateComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Create() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Feedback Create
                </h2>
            }
        >
            <Head title="Feedback Create" />

            <div className="py-12">
                <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <CreateComponent />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
