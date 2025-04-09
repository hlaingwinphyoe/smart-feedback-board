import ApplicationLogo from "@/Components/ApplicationLogo";
import CreateComponent from "@/Components/CreateComponent";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Welcome() {
    const user = usePage().props.auth.user;

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-100 h-screen">
                <div className="navbar mx-auto container">
                    <div className="flex-1">
                        <ApplicationLogo className="size-8" />
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            {user ? (
                                <li>
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link href={route("login")}>Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                    <h1 className="text-xl">Welcome!</h1>
                    <p className="text-lg mb-5">
                        You can send a feedback Form!
                    </p>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <CreateComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
