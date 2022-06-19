import React, { useState } from "react";

type UseModalContentReturn = [
  isOpen: boolean,
  toggle: () => void,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
];

const useModalContent = (): UseModalContentReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  return [isOpen, toggle, setIsOpen];
};

export default useModalContent;
