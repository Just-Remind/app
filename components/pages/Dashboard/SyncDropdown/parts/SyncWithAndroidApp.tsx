type Props = {
  handleOpenModal: (modalName: string) => void;
};

const SyncWithAndroidApp = ({ handleOpenModal }: Props): JSX.Element => (
  <button
    className="w-full text-sm text-left text-gray-500 hover:text-gray-700 whitespace-nowrap"
    onClick={(): void => handleOpenModal("Android App Modal")}
  >
    Import HTML file from Kindle android app
  </button>
);

export default SyncWithAndroidApp;
