import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "components/Button/Button";
import TemplateShopPage from "components/TemplateShopPage/TemplateShopPage";
import { useBasketContext } from "context/BasketProvider";

import ItemBasket from "./ItemBasket/ItemBasket";
import { IProduct } from "../ProductPage/ProductPage";

export type IProductBasket = IProduct & {
    count: number;
}

export default function BasketPage() {
    const {basket, onChangedBasket} = useBasketContext();
    const [products, setProducts] = useState<IProductBasket[]>([]);

    useEffect(() => {
       
        const fetch = async () => {
            setProducts([]);
            let tempProducts: IProductBasket[] = [];
            for (let row of basket) {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND}/products/${row.id}`);
                tempProducts.push({...res.data, count: row.count});
            }
 
            setProducts(tempProducts);
        }

        fetch();
       
    }, [basket]);

    const totalCount = products.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = products.reduce((sum, item) => sum + item.price * item.count, 0);
     
    return (
        <TemplateShopPage>
            <h1>Корзина</h1>
            <table border={1} width="100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Изображение</th>
                        <th>Нование товара</th>
                        <th>Кол-во</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((row, index) => (
                        <ItemBasket row={row} index={index} />
                    ))}
                </tbody>
                <tfoot style={{textAlign: "left"}}>
                    <tr>
                        <th colSpan={3}>Итого:</th>
                        <th>{totalCount} шт.</th>
                        <th colSpan={2}>{totalPrice} Руб.</th>
                    </tr>
                </tfoot>
            </table>

            <p>
                <NavLink to={"/order"}>Оформить заказ</NavLink>
            </p>
        </TemplateShopPage>
    )
}