const NoBooksInstructions = (): JSX.Element => (
  <>
    <p>Sync your books now by following the next steps:</p>
    <ol className="mt-2 ml-6 text-gray-700 list-decimal">
      <li>Download the{" "}
        <a
          href="https://chrome.google.com/webstore/detail/just-remind-chrome-extens/iidldfielonfgiabbjjkbigjjclcpefa"
          target="_blank"
          className="text-blue-500 hover:text-blue-600"
        >
          Just Remind Google Chrome Extension
        </a>
      </li>
      <li>
        Go to the{" "}
          <a
            href="https://read.amazon.com/notebook?ref_=kcr_notebook_lib"
            target="_blank"
            className="text-blue-500 hover:text-blue-600"
          >
            Amazon Kindle e-reader
          </a>
      </li>
      <li>Open the Just Remind extension and import your books!</li>
    </ol>
  </>
);

export default NoBooksInstructions;
