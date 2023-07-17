import React from "react";
import Button from "components/Button/Button";
import { useBasketContext } from "context/BasketProvider";
import { ClassBasket } from "utils/ClassBasket";

import { IProductBasket } from "../BasketPage";

type IProps = {
    index: number;
    row: IProductBasket;
}

export default function ItemBasket({ row, index }: IProps) {
    const {basket, onChangedBasket} = useBasketContext();
    
    return (
        <tr>
            <td>{index + 1}</td>
            <td><img src={row?.image} alt="нет картинки" height={50} /></td>
            <td>{row?.title}</td>
            <td>
                <button onClick={() => {
                    ClassBasket.addProduct(row.id, 1);
                    onChangedBasket();
                }}>+</button>

                {row.count}

                <button onClick={() => {
                     ClassBasket.removeProduct(row.id, 1);
                     onChangedBasket();
                }}>-</button>
            </td>
            <td>{row?.price}</td>
            
            <td width={1}>
                <Button onClick={() => {
                    ClassBasket.removeProduct(row.id, 9999);
                    onChangedBasket();
                }}>Удалить</Button>
            </td>
        </tr>
    )
}