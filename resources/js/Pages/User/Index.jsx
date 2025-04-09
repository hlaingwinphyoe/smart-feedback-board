import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Index({ users }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchInput !== "") {
                router.get(
                    route("users.index"),
                    { search: searchInput },
                    { preserveState: true }
                );
            } else if (searchInput === "" && route().params.search) {
                router.get(route("users.index"), {}, { preserveState: true });
            }
        }, 500); // 500ms debounce time

        return () => clearTimeout(debounceTimer);
    }, [searchInput]);

    const confirmUserDeletion = () => {
        setConfirmDelete(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("users.destroy"), {
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
            router.delete(route("users.destroy", id));
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
                    User List
                </h2>
            }
        >
            <Head title="User List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex justify-end">
                                <TextInput
                                    type="text"
                                    placeholder="Search users..."
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
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.length > 0 ? (
                                            users.data.map((user, index) => (
                                                <tr key={user.id}>
                                                    <th>{index + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        {user.is_admin
                                                            ? "Admin"
                                                            : "User"}
                                                    </td>
                                                    <td>{user.created_at}</td>
                                                    <td>
                                                        {!user.is_admin && (
                                                            <DangerButton
                                                                onClick={
                                                                    confirmUserDeletion
                                                                }
                                                            >
                                                                Delete
                                                            </DangerButton>
                                                        )}
                                                        <Modal
                                                            show={confirmDelete}
                                                            onClose={closeModal}
                                                        >
                                                            <form
                                                                onSubmit={
                                                                    deleteUser
                                                                }
                                                                className="p-6"
                                                            >
                                                                <h2 className="text-lg font-medium text-gray-900">
                                                                    Are you sure
                                                                    you want to
                                                                    delete user?
                                                                </h2>

                                                                <p className="mt-1 text-sm text-gray-600">
                                                                    Once user is
                                                                    deleted, it
                                                                    is
                                                                    permanently
                                                                    delete user.
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
                                                                                user.id
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
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center py-4"
                                                >
                                                    No users found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                links={users.links}
                                preserveScroll={true}
                                preserveState={true}
                            />

                            <div className="text-sm text-gray-500 mt-4 text-center">
                                Showing {users.from || 0} to {users.to || 0} of{" "}
                                {users.total} results
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
