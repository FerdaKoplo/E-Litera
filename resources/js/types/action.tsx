import { Inertia } from "@inertiajs/inertia";

export const categoryActions = (row: Category) => [
    { label: "View", href: "/categories/:id" },
    { label: "Edit", href: "/categories/:id/edit" },
    {
        label: "Delete",
        confirmMessage: "Are you sure?",
        onClick: (id: number | string) => {
            Inertia.delete(`/categories/${id}`, { preserveScroll: true });
        }
    },
];
