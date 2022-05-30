import { FC } from "react";
import classes from "./Header.module.scss";

interface HeaderProps {
  clickOnCart: () => void;
  clickOnMain: () => void;
}

export const Header: FC<HeaderProps> = ({ clickOnCart, clickOnMain }) => {
  return (
    <div className={classes.Header}>
      <button className="primary" onClick={clickOnCart}>
        <img src="https://bbts1.azureedge.net/site-images/shopping-cart.png" />
        Cart
      </button>

      <button className="primary" onClick={clickOnMain}>
        Main
      </button>
    </div>
  );
};
