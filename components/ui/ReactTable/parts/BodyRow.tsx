import { Row } from "@tanstack/react-table";

import BodyCell from "./BodyCell";

type Props<T> = {
  row: Row<T>;
  index: number;
};
const BodyRow = <T,>({ row, index }: Props<T>): JSX.Element => {
  // VARS
  const className = index % 2 === 0 ? "bg-white" : "bg-gray-50";

  return (
    <tr className={className}>
      {row.getVisibleCells().map((cell) => (
        <BodyCell key={cell.id} row={row} cell={cell} />
      ))}
    </tr>
  );
};

export default BodyRow;
