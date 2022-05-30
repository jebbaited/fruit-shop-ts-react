import { FC } from "react";
import { Button } from "../../components/UI/Button/Button";
import { IFruit } from "../../types/types";
import classes from "./Fruit.module.scss";

interface FruitProps extends IFruit {
  clickedAddToCart: (item: IFruit) => void;
}

export const Fruit: FC<FruitProps> = ({
  name,
  price,
  img,
  id,
  clickedAddToCart,
}) => {
  let nameWithCapital: string = "";
  const addToCartHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const item: IFruit = {
      name: name,
      price: price,
      img: img,
      id: id,
    };

    clickedAddToCart(item);
  };

  return (
    <div className={classes.Fruit}>
      <img src={img} />
      <h3>
        {(nameWithCapital = name[0].toUpperCase() + name.substring(1))}: {price}
        $
      </h3>
      <Button onClick={addToCartHandler}>Add to cart</Button>
    </div>
  );
};
