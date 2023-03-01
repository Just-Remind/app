import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import Spinner from "../loaders/Spinner";
import BodyRow from "./parts/BodyRow";
import HeaderCell from "./parts/HeaderCell";
import styles from "./ReactTable.module.css";

type Props<T> = {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
};

const ReactTable = <T,>(props: Props<T>): JSX.Element => {
  // PROPS
  const { data, columns, isLoading } = props;

  // RT
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden border border-black border-opacity-10">
        <div className={`overflow-x-auto md:-mx-6 lg:-mx-8 ${styles["show-scrollbar"]}`}>
          <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
            <div className="relative shadow">
              <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <HeaderCell key={header.id} header={header} />
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row, index) => (
                    <BodyRow key={row.id} row={row} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
