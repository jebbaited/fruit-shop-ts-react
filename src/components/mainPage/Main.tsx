import { useState } from "react";
import { Cart } from "../../containers/Cart/Cart";
import { FruitList } from "../../containers/FruitList/FruitList";
import { IAmount, IFruit } from "../../types/types";
import { Header } from "../Header";

export default function Main() {
  const [isShowedCart, setIsShowedCart] = useState<boolean>(false);
  const [addedItems, setAddedItems] = useState<IFruit[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [amountOfFruits, setAmountOfFruits] = useState<IAmount>({
    banana: 0,
    apple: 0,
    papaya: 0,
  });

  const isShowedCartHandler = () => {
    setIsShowedCart(true);

    if (addedItems.length === 0) initialState();
  };

  const showMainHandler = () => {
    setIsShowedCart(false);

    if (addedItems.length === 0) initialState();
  };

  const initialState = () => {
    setTotalPrice(0);
    setTotalWeight(0);
    setDiscount(0);
    setAmountOfFruits({
      banana: 0,
      apple: 0,
      papaya: 0,
    });
  };

  const countPrice = (weight: number, itemPrice: number) => {
    const kgsToGetDiscount = 3;
    if (weight % kgsToGetDiscount === 0 && weight > 0) {
      const discountPerKgs = 5;

      setTotalPrice(totalPrice + itemPrice - discountPerKgs);
      setDiscount(discount + discountPerKgs);
      return;
    }
    setTotalPrice(totalPrice + itemPrice);
  };

  const handleAmountOfFruits = (item: IFruit) => {
    setAmountOfFruits({
      ...amountOfFruits,
      [item.name]: amountOfFruits[item.name as keyof typeof amountOfFruits] + 1,
    });
  };

  const addToCart = (addedItem: IFruit) => {
    setIsShowedCart(true);

    const itemsCopy = addedItems.concat();

    if (itemsCopy.length === 0) {
      itemsCopy.push(addedItem);
    } else {
      const found = itemsCopy.find(({ name }) => name === addedItem.name);
      if (found === undefined) {
        itemsCopy.push(addedItem);
      }
    }

    const updateWeight = totalWeight + 1;

    setAddedItems(itemsCopy);
    setTotalWeight(updateWeight);
    setTotalPrice(totalPrice + addedItem.price);

    countPrice(updateWeight, addedItem.price);
    handleAmountOfFruits(addedItem);
  };

  const countDecreasedDiscount = (
    weight: number,
    decreasedTotalPrice: number
  ) => {
    const discountAmount = 5;
    const discountPerKgs = 3;
    const currentDiscount =
      Math.floor(weight / discountPerKgs) * discountAmount;

    decreasedTotalPrice += discount - currentDiscount;
    setDiscount(currentDiscount);
    setTotalPrice(decreasedTotalPrice);
  };

  const removeElement = (item: IFruit) => {
    let itemsCopy: IFruit[] = [];

    addedItems.forEach((elem) => {
      if (elem.name !== item.name) {
        itemsCopy.push(elem);
      }
    });

    setAddedItems(itemsCopy);

    decreaseTotal(item);
  };

  const countDecreasedPriceAndWeight = (item: IFruit) => {
    let decreasedTotalPrice: number = 0;
    let decreasedTotalWeight: number = 0;
    const keys = Object.keys(amountOfFruits);

    keys.forEach((key) => {
      if (key === item.name) {
        decreasedTotalPrice =
          totalPrice -
          item.price * amountOfFruits[key as keyof typeof amountOfFruits];
        decreasedTotalWeight =
          totalWeight - amountOfFruits[key as keyof typeof amountOfFruits];
        setAmountOfFruits({
          ...amountOfFruits,
          [key]: 0,
        });
      }
    });

    return { decreasedTotalPrice, decreasedTotalWeight };
  };

  const decreaseTotal = (item: IFruit) => {
    let decreaseTotalPrice: number = 0;
    let decreaseTotalWeight: number = 0;

    decreaseTotalWeight =
      countDecreasedPriceAndWeight(item).decreasedTotalWeight;
    decreaseTotalPrice = countDecreasedPriceAndWeight(item).decreasedTotalPrice;

    setTotalWeight(decreaseTotalWeight);
    countDecreasedDiscount(decreaseTotalWeight, decreaseTotalPrice);
  };

  return (
    <>
      <Header clickOnCart={isShowedCartHandler} clickOnMain={showMainHandler} />
      {isShowedCart ? (
        <Cart
          addedItems={addedItems}
          totalPrice={totalPrice}
          totalWeight={totalWeight}
          discount={discount}
          amount={amountOfFruits}
          removeElement={removeElement}
        />
      ) : (
        <FruitList clickOnCart={addToCart} />
      )}
    </>
  );
}
