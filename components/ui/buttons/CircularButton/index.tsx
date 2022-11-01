type Props = {
  children: JSX.Element;
  className?: string;
};

const CircularButton = ({ children, className }: Props): JSX.Element => (
  <button
    type="button"
    className={`
      ${className}
      inline-flex items-center p-3 text-white bg-gray-500
      border border-transparent rounded-full shadow-sm hover:bg-gray-700
      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
      `}
  >
    {children}
  </button>
);

export default CircularButton;
