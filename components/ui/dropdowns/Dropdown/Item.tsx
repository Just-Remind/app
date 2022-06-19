import { Menu } from "@headlessui/react";

type Props = {
  children: React.ReactNode;
};

const Item = (props: Props): JSX.Element => {
  // PROPS
  const { children } = props;

  return (
    <Menu.Item>
      <div className="px-4 py-2">{children}</div>
    </Menu.Item>
  );
};

export default Item;
