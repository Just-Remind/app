import { ReactNode } from "react";

import { Cell, flexRender, Row } from "@tanstack/react-table";

import styles from "../ReactTable.module.css";

type Props<T> = {
  row: Row<T>;
  cell: Cell<T, unknown>;
};

const BodyCell = <T,>({ row, cell }: Props<T>): JSX.Element => {
  // METHODS
  const renderCell = (): ReactNode | null => {
    if (cell.getIsAggregated() || cell.getIsPlaceholder()) return null;
    else return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <td onClick={(): void => row.toggleExpanded()} className={styles.cell}>
      {renderCell()}
    </td>
  );
};

export default BodyCell;
