import RowActions from "@/Pages/Category/Partial/RowAction";
import { categoryActions } from "./action";
import { getTypeColor } from "@/helper/color";

export const categoryColumns = [
  { header: "Name", accessor: (row: Category) => row.name },
  { header: "Type", accessor: (row: Category) => row.type },
  {
     header: "Parent Category",
     accessor: (row: Category) => <span className={getTypeColor(row.type)}>{row.type}</span>
    },
  {
    header: "Actions",
    accessor: (row: Category) => <RowActions rowId={row.id} actions={categoryActions(row)} />,
  },
];
