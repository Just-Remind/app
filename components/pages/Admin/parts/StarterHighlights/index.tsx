import { useState } from "react";

import { PlusCircleIcon } from "@heroicons/react/outline";

import { StarterHighlight } from "types";

import StarterHighlightForm from "./parts/StarterHighlightsForm";
import StarterHighlightsTable from "./parts/StarterHighlightsTable";

const StarterHighlights = (): JSX.Element => {
  // STATE
  const [formMode, setFormMode] = useState<string>();
  const [selectedHighlight, setSelectedHighlight] = useState<StarterHighlight>();

  // METHODS
  const handleSetFormMode = (value?: string): void => setFormMode(value);
  const handletSelectedHighlight = (value?: StarterHighlight): void => setSelectedHighlight(value);

  return (
    <div className="p-4 space-y-4 border rounded shadow border-gray-50">
      <h4 className="flex items-center space-x-2 font-medium leading-6 text-gray-700 text-md">
        <span>Starter highlight</span>
        {!formMode && (
          <PlusCircleIcon
            onClick={(): void => setFormMode("new")}
            className="h-5 text-green-500 cursor-pointer hover:text-green-600"
          />
        )}
      </h4>
      {formMode && (
        <StarterHighlightForm
          formMode={formMode}
          handleSetFormMode={handleSetFormMode}
          selectedHighlight={selectedHighlight}
          handletSelectedHighlight={handletSelectedHighlight}
        />
      )}
      <StarterHighlightsTable
        handleSetFormMode={handleSetFormMode}
        handletSelectedHighlight={handletSelectedHighlight}
      />
    </div>
  );
};

export default StarterHighlights;
