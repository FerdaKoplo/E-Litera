import RowActions from "@/Pages/Category/Partial/RowAction";
import { categoryActions, publicationsActions } from "./action";
import { getTypeColor } from "@/helper/color";

export const categoryColumns = [
    { header: "#", accessor: (_: Category, index?: number) => (index ?? 0) + 1 },
    { header: "Name", accessor: (row: Category) => row.name },
    { header: "Type", accessor: (row: Category) => row.type },
    {
        header: "Parent Category",
        accessor: (row: Category) => (
            <span className={row.parent ? getTypeColor(row.parent?.name) : "text-gray-500"}>
                {row.parent?.name ?? "-"}
            </span>
        )
    },
    {
        header: "Actions",
        accessor: (row: Category) => <RowActions rowId={row.id} actions={categoryActions(row)} />,
    },
];

export const publicationsColumns = [
    { header: "#", accessor: (_: Publications, index?: number) => (index ?? 0) + 1 },
    { header: "Title", accessor: (row: Publications) => row.title },
    { header: "Author", accessor: (row: Publications) => row.author || "-" },
    { header: "Type", accessor: (row: Publications) => row.type },
    {
        header: "Category",
        accessor: (row: Publications) => (
            <span className={row.category ? getTypeColor(row.category.name) : "text-gray-500"}>
                {row.category?.name ?? "-"}
            </span>
        ),
    },
    {
        header: "Image",
        accessor: (row: Publications) => (
            typeof row.image_url === "string" ? (
                <a
                    href={row.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={row.image_url}
                        alt={row.title}
                        className="w-16 h-16 object-cover rounded"
                    />
                </a>
            ) : (
                <span className="text-gray-500">New Upload</span>
            )
        )
    },
    {
        header: "PDF",
        accessor: (row: Publications) => (
            typeof row.pdf_url === "string" ? (
                <a
                    href={row.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                >
                    View PDF
                </a>
            ) : (
                <span className="text-gray-500">New Upload</span>
            )
        )
    },

    {
        header: "Location",
        accessor: (row: Publications) => row.location?.name ?? "-",
    },
    {
        header: "Actions",
        accessor: (row: Publications) => (
            <RowActions rowId={row.id} actions={publicationsActions(row)} />
        ),
    },
];
