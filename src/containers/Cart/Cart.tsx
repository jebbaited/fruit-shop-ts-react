import classes from "./Cart.module.scss";
import { AddedFruits } from "./AddedFruits/AddedFruits";
import { FC } from "react";
import { IAmount, IFruit } from "../../types/types";

interface CartProps {
  addedItems: IFruit[];
  totalPrice: number;
  totalWeight: number;
  discount: number;
  amount: IAmount;
  removeElement: (item: IFruit) => void;
}

export const Cart: FC<CartProps> = ({
  addedItems,
  totalPrice,
  totalWeight,
  discount,
  amount,
  removeElement,
}) => {
  const renderAddedItems = () => {
    return addedItems.map((item, index) => {
      return (
        <AddedFruits
          key={index}
          name={item.name}
          price={item.price}
          img={item.img}
          id={item.id}
          amount={amount}
          removeElement={() => removeElement(item)}
        />
      );
    });
  };

  return (
    <div className={classes.Cart}>
      {addedItems.length === 0 ? (
        <h2>The list is empty</h2>
      ) : (
        <>
          {renderAddedItems()}

          <hr />
          <h1>
            Total price: {totalPrice}$ <br />
            Weight: {totalWeight}kg <br />
            Discount: {discount}$
          </h1>
        </>
      )}
    </div>
  );
};
