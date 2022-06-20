import ReactTimezoneSelect, { ITimezoneOption } from "react-timezone-select";

type Props = {
  value: string;
  onChange: (timezone: ITimezoneOption) => void;
};

const TimezoneSelect = ({ value, onChange }: Props): JSX.Element => (
  <div className="items-center py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
    <dt className="text-sm font-medium text-gray-500">Timezone</dt>
    <div className="flex justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      <ReactTimezoneSelect value={value} onChange={onChange} />
    </div>
  </div>
);

export default TimezoneSelect;
