import { BeakerIcon } from "@heroicons/react/outline";

import { Switch } from "components/ui";
import { useEditBonusHighlightEnabled, useEditBonusHighlightNumber } from "services/cronjobs";

type Props = {
  cronId: number;
  bonusHighlightsEnabled: boolean;
  bonusHighlightsPerEmail: number;
};

const BonusHighlights = (props: Props): JSX.Element => {
  // PROPS
  const { cronId, bonusHighlightsEnabled, bonusHighlightsPerEmail } = props;

  // RQ
  const { mutate: editBonusHighlightEnabled } = useEditBonusHighlightEnabled();
  const { mutate: editBonusHighlightNumber } = useEditBonusHighlightNumber();

  // METHODS
  const handleToggleBonusHighlights = (checked: boolean): void => {
    editBonusHighlightEnabled({ cronId, enabled: checked });
  };

  // VARS
  const selectOptions = [1, 2, 3, 4, 5];

  return (
    <div>
      <Switch
        label={
          <p>
            Bonus highlights{" "}
            <span className="text-blue-500">
              (Beta <BeakerIcon className="inline w-3 h-3" />)
            </span>
          </p>
        }
        description="You will be inspired by highlights from books you have not read, yet!"
        checked={bonusHighlightsEnabled}
        onChange={handleToggleBonusHighlights}
      />

      <div className="items-center py-4 border-t sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:pt-5">
        <dt className="text-sm font-medium text-gray-600">Bonus highlights per email</dt>
        <div className="flex justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
          <select
            value={bonusHighlightsPerEmail}
            onChange={(e): void =>
              editBonusHighlightNumber({ cronId, number: Number(e.target.value) })
            }
            disabled={!bonusHighlightsEnabled}
          >
            {selectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BonusHighlights;
