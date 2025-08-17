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


export const publicationsActions = (row: Publications) => [
    { label: "View", href: `/publications/${row.id}` },
    { label: "Edit", href: `/publications/${row.id}/edit` },
    {
        label: "Delete",
        confirmMessage: "Are you sure you want to delete this publication?",
        onClick: (id: number | string) => {
            Inertia.delete(`/publications/${id}`, { preserveScroll: true });
        },
    },
];
