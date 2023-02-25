import { flexRender, Header } from "@tanstack/react-table";
import classNames from "classnames";

import styles from "../ReactTable.module.css";

type Props<T> = {
  header: Header<T, unknown>;
};

const HeaderCell = <T,>({ header }: Props<T>): JSX.Element => (
  <th
    key={header.id}
    scope="col"
    className={classNames("bg-gray-50 py-3.5 pl-4 pr-3 sm:pl-6", styles.cell_header)}
  >
    <span className="inline-flex items-center group">
      {flexRender(header.column.columnDef.header, header.getContext())}
    </span>
  </th>
);

export default HeaderCell;
