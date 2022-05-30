import { FC } from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: string;
  isDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  type,
  children,
  isDisabled,
}) => {
  const cls = [classes.Button];

  return (
    <button onClick={onClick} className={cls.join(" ")} disabled={isDisabled}>
      {children}
    </button>
  );
};
