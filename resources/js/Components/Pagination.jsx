// Create a new file at: /resources/js/Components/Pagination.jsx

import React from "react";
import { router } from "@inertiajs/react";

export default function Pagination({
    links,
    preserveScroll = true,
    preserveState = true,
    only = [],
}) {
    const handlePageNavigation = (url, queryParams = {}) => {
        if (!url) return;

        router.get(url, queryParams, {
            preserveScroll,
            preserveState,
            only,
        });
    };

    return (
        <div className="mt-6">
            <div className="join w-full flex justify-center items-center">
                {links.map((link, index) => (
                    <button
                        key={index}
                        className={`join-item btn ${
                            link.active ? "btn-active" : "btn-outline"
                        } ${!link.url ? "btn-disabled" : ""}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        onClick={() => handlePageNavigation(link.url)}
                        disabled={!link.url}
                    />
                ))}
            </div>
            {links.length > 0 && links[0].hasOwnProperty("meta") && (
                <div className="text-sm text-gray-500 mt-4 text-center">
                    Showing {links[0].meta.from || 0} to {links[0].meta.to || 0}{" "}
                    of {links[0].meta.total} results
                </div>
            )}
        </div>
    );
}
