import { ExternalLinkIcon } from "@heroicons/react/solid";

const NoBooksInstructions = (): JSX.Element => (
  <>
    <div className="lg:hidden">
      <p>Visit the app on desktop to sync your books 👌</p>
    </div>
    <div className="hidden lg:block">
      <p>Sync your books now by following the next steps:</p>
      <ol className="mt-2 ml-6 space-y-2 text-gray-700 list-decimal">
        <li>
          Download the{" "}
          <a
            href="https://chrome.google.com/webstore/detail/just-remind-chrome-extens/iidldfielonfgiabbjjkbigjjclcpefa"
            target="_blank"
            className="text-blue-500 hover:text-blue-600"
            rel="noreferrer"
          >
            Just Remind Google Chrome Extension
          </a>
        </li>
        <li>
          <div className="flex items-center">
            Click on the{" "}
            <span className="flex items-center mx-1.5 space-x-1 text-sm text-gray-500">
              <span>Sync your books</span>
              <ExternalLinkIcon className="w-4" />
            </span>{" "}
            link above
          </div>
        </li>
        <li>Open the Just Remind extension and import your books!</li>
      </ol>
    </div>
  </>
);

export default NoBooksInstructions;
