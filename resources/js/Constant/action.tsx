import { Inertia } from "@inertiajs/inertia";

export const categoryActions = (row: Category) => [
    { label: "Edit", href: "/categories/:id/edit" },
    {
        label: "Delete",
        confirmMessage: "Are you sure?",
        onClick: (id: number | string) => {
            Inertia.delete(`/categories/${id}`, { preserveScroll: true });
        }
    },
]

export const locationActions = (row: Location) => [
    { label: "Edit", href: "/locations/:id/edit" },
    {
        label: "Delete",
        confirmMessage: "Are you sure?",
        onClick: (id: number | string) => {
            Inertia.delete(`/locations/${id}`, { preserveScroll: true });
        }
    },
]


export const publicationsActions = (row: Publications) => [
    { label: "Edit", href: `/publications/${row.id}/edit` },
    {
        label: "Delete",
        confirmMessage: "Are you sure you want to delete this publication?",
        onClick: (id: number | string) => {
            Inertia.delete(`/publications/${id}`, { preserveScroll: true });
        },
    },
]

export const articleActions = (row: Article) => [
    { label: "View", href: `/articles/${row.id}` },
    { label: "Edit", href: `/articles/${row.id}/edit` },
    {
        label: "Delete",
        confirmMessage: "Are you sure you want to delete this article?",
        onClick: (id: number | string) => {
            Inertia.delete(`/articles/${id}`, { preserveScroll: true });
        },
    },
]

export const loanActions = (row: Loan) => [
    { label: "Edit", href: `/loan/${row.id}/edit` },
]
