import ExternalLink from "next/link";

import { Button } from "components/ui";
import { Card } from "types";

type Props = {
  cards: Card[];
  containerClassName?: string;
};

const Cards = (props: Props): JSX.Element => {
  // PROPS
  const { cards, containerClassName } = props;

  return (
    <div
      // eslint-disable-next-line max-len
      className={`space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4 ${containerClassName}`}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          // eslint-disable-next-line max-len
          className="flex flex-col justify-between p-6 border border-gray-200 divide-y rounded-lg shadow-sm"
        >
          <div>
            <h2 className="pb-2 text-lg font-medium leading-6 text-gray-900 border-b border-gray-200">
              {card.title}
            </h2>
            <p className="mt-4 text-sm text-gray-500">{card.description}</p>
          </div>

          {card.onClick && (
            <Button
              onClick={card.onClick}
              className="block w-full mt-8 font-semibold text-center text-white rounded-md"
            >
              {card.btnText}
            </Button>
          )}

          {card.href && (
            <ExternalLink href={card.href}>
              <a
                target="_blank"
                // eslint-disable-next-line max-len
                className="block w-full py-1.5 mt-8 text-sm font-semibold text-center text-white bg-green-600 rounded-md hover:bg-green-700 focus:ring-green-500"
              >
                {card.btnText}
              </a>
            </ExternalLink>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cards;
