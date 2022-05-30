import { FC } from "react";
import classes from "./AddedFruits.module.scss";
import { IAmount, IFruit } from "../../../types/types";
import { Button } from "../../../components/UI/Button/Button";

interface AddedFruitsProps extends IFruit {
  amount: IAmount;
  removeElement: () => void;
}

export const AddedFruits: FC<AddedFruitsProps> = ({
  name,
  price,
  img,
  id,
  amount,
  removeElement,
}) => {
  const getAmountOfCurrentFruit = () => {
    return amount[name as keyof typeof amount];
  };

  const getSubtotalPrice = (): number => {
    const amountTemp = getAmountOfCurrentFruit();
    if (amountTemp === undefined) return 0;
    return amountTemp * price;
  };

  return (
    <div className={classes.AddedFruits}>
      <div>
        <img src={img}></img>
      </div>
      <span>{name.toLocaleUpperCase()}</span>
      <span>Price: {price}$/kg</span>
      <span>Amount: {getAmountOfCurrentFruit()} kg</span>
      <span>Subtotal: {getSubtotalPrice()}</span>
      <Button onClick={removeElement}>Remove</Button>
    </div>
  );
};
