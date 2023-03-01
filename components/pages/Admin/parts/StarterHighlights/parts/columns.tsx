import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { TextButton } from "components/ui";
import { StarterHighlight } from "types";

const columnsHelper = createColumnHelper<StarterHighlight>();

type Params = {
  handleEditHighlight: (highlight: StarterHighlight) => void;
  handleDeleteHighlight: (highlight: StarterHighlight) => void;
};

export const getStarterHighlightsColumns = (params: Params): ColumnDef<StarterHighlight>[] => {
  const { handleEditHighlight, handleDeleteHighlight } = params;

  return [
    columnsHelper.accessor("id", { header: "ID " }),
    columnsHelper.accessor("title", { header: "Title " }),
    columnsHelper.accessor("author", { header: "Author " }),
    columnsHelper.accessor("content", { header: "Highlight" }),
    columnsHelper.display({
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center space-x-4">
          <TextButton onClick={(): void => handleEditHighlight(info.row.original)} color="yellow">
            Edit
          </TextButton>
          <TextButton onClick={(): void => handleDeleteHighlight(info.row.original)} color="red">
            Delete
          </TextButton>
        </div>
      ),
    }),
  ] as ColumnDef<StarterHighlight>[];
};
