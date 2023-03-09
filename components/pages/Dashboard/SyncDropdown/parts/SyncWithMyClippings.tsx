type Props = {
  handleOpenModal: (modalName: string) => void;
};

const SyncWithMyClippings = ({ handleOpenModal }: Props): JSX.Element => (
  <button
    className="w-full text-sm text-left text-gray-500 hover:text-gray-700 whitespace-nowrap"
    onClick={(): void => handleOpenModal("Clippings Modal")}
  >
    Import My Clippings.txt
  </button>
);

export default SyncWithMyClippings;
