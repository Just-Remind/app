type Props = {
  toggle: () => void;
};

const SyncWithMyClippings = ({ toggle }: Props): JSX.Element => (
  <button
    className="w-full text-sm text-left text-gray-500 hover:text-gray-700 whitespace-nowrap"
    onClick={toggle}
  >
    Import My Clippings.txt
  </button>
);

export default SyncWithMyClippings;
