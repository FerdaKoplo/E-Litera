import RowActions from "@/Components/Table/RowAction";
import { articleActions, categoryActions, deliveryActions, locationActions, publicationsActions, } from "./action";
import { getTypeColor } from "@/helper/color";
import LoanStatusCell from "@/Components/Table/LoanStatus";

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

export const locationColumns = [
    { header: "#", accessor: (_: Location, index?: number) => (index ?? 0) + 1 },
    { header: "Bookshelf Location Name", accessor: (row: Location) => row.name },
    {
        header: "Actions",
        accessor: (row: Location) => <RowActions rowId={row.id} actions={locationActions(row)} />,
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

export const articleColumns = [
    { header: "#", accessor: (_: Article, index?: number) => (index ?? 0) + 1 },
    { header: "Title", accessor: (row: Article) => row.title_article },
    // {
    //     header: "Content",
    //     accessor: (row: Article) => (
    //         <div
    //             className="line-clamp-2 max-w-xs text-gray-700"
    //             dangerouslySetInnerHTML={{ __html: row.article_content }}
    //         />
    //     ),
    // },
    {
        header: "Actions",
        accessor: (row: Article) => (
            <RowActions rowId={row.id} actions={articleActions(row)} />
        ),
    },
]

export const loanColumns = [
    { header: "#", accessor: (_: Loan, index?: number) => (index ?? 0) + 1 },
    { header: "Name", accessor: (row: Loan) => row.user?.name },
    { header: "Email", accessor: (row: Loan) => row.user?.email },
    { header: "Book Title", accessor: (row: Loan) => row.publication?.title },
    { header: "Start Date", accessor: (row: Loan) => row.start_date },
    { header: "Due Date", accessor: (row: Loan) => row.due_date },
    { header: "Status", accessor: (row: Loan) => <LoanStatusCell loan={row} key={row.id} /> },
    { header: "Fine Amount", accessor: (row: Loan) => row.fine_amount },
    // {
    //     header: "Content",
    //     accessor: (row: Article) => (
    //         <div
    //             className="line-clamp-2 max-w-xs text-gray-700"
    //             dangerouslySetInnerHTML={{ __html: row.article_content }}
    //         />
    //     ),
    // },

]


export const deliveryColumns = [
    { header: "#", accessor: (_: Delivery, index?: number) => (index ?? 0) + 1 },
    { header: "Member Name", accessor: (row: Delivery) => row.loan?.user?.name ?? "-" },
    { header: "Member Loan Status", accessor: (row: Delivery) => row.loan?.status },
    { header: "Tracking Number", accessor: (row: Delivery) => row.tracking_number },
    { header: "Courier", accessor: (row: Delivery) => row.courier ?? "-" },
    { header: "Status", accessor: (row: Delivery) => row.status },
    {
        header: "Actions",
        accessor: (row: Delivery) => <RowActions rowId={row.id} actions={deliveryActions(row)} />,
    },
];



// member

export const loanMemberColumns = [
    { header: "#", accessor: (_: Loan, index?: number) => (index ?? 0) + 1 },
    { header: "Name", accessor: (row: Loan) => row.user?.name },
    { header: "Email", accessor: (row: Loan) => row.user?.email },
    { header: "Book Title", accessor: (row: Loan) => row.publication?.title },
    { header: "Start Date", accessor: (row: Loan) => row.start_date },
    { header: "Due Date", accessor: (row: Loan) => row.due_date },
    { header: "Status", accessor: (row: Loan) => row.status },
    { header: "Fine Amount", accessor: (row: Loan) => row.fine_amount },
    // {
    //     header: "Content",
    //     accessor: (row: Article) => (
    //         <div
    //             className="line-clamp-2 max-w-xs text-gray-700"
    //             dangerouslySetInnerHTML={{ __html: row.article_content }}
    //         />
    //     ),
    // },

]
