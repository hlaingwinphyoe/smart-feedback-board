import { useForm } from "@inertiajs/react";
import React from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";

function CreateComponent() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("feedbacks.store"), {
            onFinish: () => reset("title", "description"),
        });
    };
    return (
        <form onSubmit={submit}>
            <div className="mt-4">
                <InputLabel htmlFor="title" value="Title" />

                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("title", e.target.value)}
                />

                <InputError message={errors.title} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => setData("description", e.target.value)}
                    rows={4}
                />

                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-end">
                <PrimaryButton className="ms-4" disabled={processing}>
                    Save
                </PrimaryButton>
            </div>
        </form>
    );
}

export default CreateComponent;
