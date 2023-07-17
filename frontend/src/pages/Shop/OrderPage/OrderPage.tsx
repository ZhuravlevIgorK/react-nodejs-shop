import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import FormInput from "../../../components/FormInput/FormInput";
import TemplateShopPage from "../../../components/TemplateShopPage/TemplateShopPage";
import { useBasketContext } from "../../../context/BasketProvider";
import { ClassBasket } from "../../../utils/ClassBasket";
import { IProduct } from "../ProductPage/ProductPage";


export type IProductBasket = IProduct & {
    count: number;
}

export default function OrderPage() {
    const {basket, onChangedBasket} = useBasketContext();
    const [products, setProducts] = useState<IProductBasket[]>([]);

    const [fio, setFio] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
       
        const fetch = async () => {
            setProducts([]);
            let tempProducts: IProductBasket[] = [];
            for (let row of basket) {
                const res = await axios.get(`http://localhost:9090/products/${row.id}`);
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
            {!isSuccess ? (
                <>
                    <h1>Зазказ на сумму: {totalPrice} руб.</h1>
                    <Form width={"100%"} style={{margin: "0 auto"}}>
                        <FormInput
                            label="ФИО"
                            value={fio}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFio(e.target.value)}
                        />
                        <FormInput
                            label="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                        <FormInput
                            label="phone"
                            value={phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                        />
                        <FormInput
                            label="Адрес"
                            value={address}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                        />

                        <Button type="button" onClick={(e) => {
                            e.preventDefault();
                            if (!(fio && email && phone && address)) {
                                alert("Не все поля заполнены")
                            }

                            const links = products.map((product, index) => (`${index + 1}. <a href="http://api.app.localhost:3000/product/${product.id}">${product.title} (${product.count})</a>\n`)).join("");

                            const text = encodeURI(`
                                <b>Заказ</b>\n${links}\nФИО: ${fio}\nemail: ${email}\nтел: ${phone}\naдрес: ${address}\n<i>${totalPrice} руб.</i>
                            `);
                            const url = `https://api.telegram.org/bot6000664639:AAFja1BntREe2uZCwh4FWaMwvycFSPOuMGU/sendMessage?chat_id=779087014&parse_mode=html&text=${text}`
                            
                            axios.post(url).then(() => {
                                setIsSuccess(true);
                                ClassBasket.clearBasket();
                                onChangedBasket();
                            })

                        }}>Заказать</Button>
                    </Form>
                </>
            ) : (
                "Зыказ сформирован ожидайте звонка от нашего менеджера Олега"
            )}
                        
        </TemplateShopPage>
    )
}