type Props = {
  text: string;
  className?: string;
};

const Divider = ({ text, className }: Props): JSX.Element => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center">
      <span className="px-2 text-sm text-gray-500 bg-white">{text}</span>
    </div>
  </div>
);

export default Divider;
