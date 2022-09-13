type Props = {
  cronExpression: string;
  onChange: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
};

const CronExpressionInput = (props: Props): JSX.Element => {
  // PROPS
  const { cronExpression, onChange } = props;

  // VARS
  const [deliveryMinute, deliveryHour] = cronExpression.split(" ");

  return (
    <div className="items-center py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
      <dt className="text-sm font-medium text-gray-600">Delivery time</dt>
      <div className="flex justify-end mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <input
          type="time"
          onBlur={onChange}
          defaultValue={`${deliveryHour.padStart(2, "0")}:${deliveryMinute.padStart(2, "0")}`}
        />
      </div>
    </div>
  );
};

export default CronExpressionInput;
