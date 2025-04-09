import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="p-6 text-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="space-y-4">
                            <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
                                <p className="text-sm text-gray-500 mb-4">
                                    Total Submissions
                                </p>
                                <h2 className="text-3xl font-bold text-indigo-600">
                                    {stats.total}
                                </h2>
                            </div>
                            <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
                                <p className="text-sm text-gray-500 mb-4">
                                    Your Submissions
                                </p>
                                <h2 className="text-3xl font-bold text-indigo-600">
                                    {stats.auth_sub_total}
                                </h2>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
                            <p className="text-sm text-gray-500 mb-2">
                                Submissions per Day
                            </p>
                            <ul className="space-y-1">
                                {Object.entries(stats.per_day).map(
                                    ([date, count]) => (
                                        <li
                                            key={date}
                                            className="flex justify-between"
                                        >
                                            <span>{date}</span>
                                            <span className="font-semibold text-gray-700">
                                                {count}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div className="bg-white shadow-lg rounded-2xl p-6 col-span-2">
                            <p className="text-sm text-gray-500 mb-4">
                                Most Common Words
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(stats.common_words).map(
                                    ([word, count]) => (
                                        <div
                                            key={word}
                                            className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-xl font-medium shadow-sm"
                                        >
                                            {word} — {count}x
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
