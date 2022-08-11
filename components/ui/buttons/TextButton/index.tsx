import styles from "./TextButton.module.css";

type Props = {
  children: React.ReactNode;
  color: "yellow" | "red";
  onClick: () => void;
  className?: string;
};

const TextButton = (props: Props): JSX.Element => {
  // PROPS
  const { children, color, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={`text-md font-medium ${styles[`button--${color}`]}`}
    >
      {children}
    </button>
  );
};

export default TextButton;
