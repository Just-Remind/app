/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "@tanstack/react-location";

type Props = {
  href: string;
  leftTitle?: string | JSX.Element;
  leftSubtitle?: string | JSX.Element;
  rightTitle?: string | JSX.Element;
  rightSubtitle?: string | JSX.Element;
};

const TwoColCard = (props: Props): JSX.Element => {
  const { href, leftTitle, leftSubtitle, rightTitle, rightSubtitle } = props;
  return (
    <li>
      <Link to={href} className="block hover:bg-gray-50">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {leftTitle}
                </p>
                <p className="flex items-center mt-2 text-sm text-gray-500">
                  <span className="truncate">{leftSubtitle}</span>
                </p>
              </div>
              <div className="hidden md:block">
                <div>
                  <p className="text-sm text-gray-900">{rightTitle}</p>
                  <p className="flex items-center mt-2 text-sm text-gray-500">
                    {rightSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ChevronRightIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TwoColCard;
