import { ExternalLinkIcon } from "@heroicons/react/solid";

const NoBooksInstructions = (): JSX.Element => (
  <>
    <div className="lg:hidden">
      <p>Visit the app on desktop to sync your books 👌</p>
    </div>
    <div className="hidden lg:block">
      <p className="mb-4 text-xl text-gray-700">Welcome on Just Remind! 🥳</p>
      <p className="mb-2">
        You don&apos;t have any book yet, so let&apos;s quickly fix that!
      </p>
      <p>The easiest way to import your books:</p>
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
          <div>
            Open the <span className="text-gray-500">Import your books</span>{" "}
            dropdown
          </div>
        </li>
        <li>
          <div>
            Click on the{" "}
            <span className="text-gray-500">Use the chrome extension</span> link
            (it will open a new tab to read.amazon.com)
          </div>
        </li>
        <li>
          Once on read.amazon.com, open the Just Remind extension and import
          your books!
        </li>
        <li>Enjoy your daily dose of re-inspiration 👌</li>
      </ol>
    </div>
  </>
);

export default NoBooksInstructions;
