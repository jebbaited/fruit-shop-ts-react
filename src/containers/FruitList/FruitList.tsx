import classes from "./FruitList.module.scss";
import { Fruit } from "../Fruit/Fruit";
import { FC, useState } from "react";
import { IFruit } from "../../types/types";
import banana from "../images/banana.jpg";
import apple from "../images/apple.jpg";
import papaya from "../images/papaya.jpg";

interface FruitListProps {
  clickOnCart: (addedItem: IFruit) => void;
}

export const FruitList: FC<FruitListProps> = ({ clickOnCart }) => {
  const [fruits, setFruit] = useState<IFruit[]>([
    {
      name: "banana",
      price: 10,
      img: banana,
      id: 1,
    },
    {
      name: "apple",
      price: 8,
      img: apple,
      id: 2,
    },
    {
      name: "papaya",
      price: 10,
      img: papaya,
      id: 3,
    },
  ]);

  return (
    <div className={classes.FruitList}>
      {fruits.map((fruit) => {
        return (
          <div key={fruit.id}>
            <Fruit
              name={fruit.name}
              price={fruit.price}
              img={fruit.img}
              id={fruit.id}
              clickedAddToCart={clickOnCart}
            />
          </div>
        );
      })}
    </div>
  );
};
