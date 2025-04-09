import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Index({ feedbacks }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchInput !== "") {
                router.get(
                    route("feedbacks.index"),
                    { search: searchInput },
                    { preserveState: true }
                );
            } else if (searchInput === "" && route().params.search) {
                router.get(
                    route("feedbacks.index"),
                    {},
                    { preserveState: true }
                );
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchInput]);

    const confirmFeedbackDeletion = () => {
        setConfirmDelete(true);
    };

    const deleteFeedback = (e) => {
        e.preventDefault();

        destroy(route("feedbacks.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmDelete(false);

        clearErrors();
        reset();
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        try {
            router.delete(route("feedbacks.destroy", id));
            closeModal();
        } catch (e) {
            console.error(e);
        }
    };

    const handlePageNavigation = (url) => {
        if (url) {
            router.get(
                url,
                {
                    search: searchTerm,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Feedback List
                </h2>
            }
        >
            <Head title="Feedback List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex justify-end">
                                <TextInput
                                    type="text"
                                    placeholder="Search feedbacks..."
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                />
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead className="text-black">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>By</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feedbacks.data.length > 0 ? (
                                            feedbacks.data.map(
                                                (feedback, index) => (
                                                    <tr key={feedback.id}>
                                                        <th>{index + 1}</th>
                                                        <td>
                                                            {feedback.title}
                                                        </td>
                                                        <td>
                                                            {feedback
                                                                .description
                                                                .length > 20
                                                                ? feedback.description.substring(
                                                                      20,
                                                                      70
                                                                  ) + "..."
                                                                : feedback.description}
                                                        </td>
                                                        <td>
                                                            {feedback.user_name}
                                                        </td>
                                                        <td>
                                                            {
                                                                feedback.created_at
                                                            }
                                                        </td>
                                                        <td>
                                                            <DangerButton
                                                                onClick={
                                                                    confirmFeedbackDeletion
                                                                }
                                                            >
                                                                Delete
                                                            </DangerButton>
                                                            <Modal
                                                                show={
                                                                    confirmDelete
                                                                }
                                                                onClose={
                                                                    closeModal
                                                                }
                                                            >
                                                                <form
                                                                    onSubmit={
                                                                        deleteFeedback
                                                                    }
                                                                    className="p-6"
                                                                >
                                                                    <h2 className="text-lg font-medium text-gray-900">
                                                                        Are you
                                                                        sure you
                                                                        want to
                                                                        delete
                                                                        feedback?
                                                                    </h2>

                                                                    <p className="mt-1 text-sm text-gray-600">
                                                                        Once
                                                                        feedback
                                                                        is
                                                                        deleted,
                                                                        it is
                                                                        permanently
                                                                        delete
                                                                        feedback.
                                                                    </p>

                                                                    <div className="mt-6 flex justify-end">
                                                                        <SecondaryButton
                                                                            onClick={
                                                                                closeModal
                                                                            }
                                                                        >
                                                                            Cancel
                                                                        </SecondaryButton>

                                                                        <DangerButton
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                handleDelete(
                                                                                    e,
                                                                                    feedback.id
                                                                                )
                                                                            }
                                                                            className="ms-3"
                                                                        >
                                                                            Delete
                                                                        </DangerButton>
                                                                    </div>
                                                                </form>
                                                            </Modal>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-4"
                                                >
                                                    No feedbacks found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={feedbacks.links}
                                preserveScroll={true}
                                preserveState={true}
                            />

                            <div className="text-sm text-gray-500 mt-4 text-center">
                                Showing {feedbacks.from || 0} to{" "}
                                {feedbacks.to || 0} of {feedbacks.total} results
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
