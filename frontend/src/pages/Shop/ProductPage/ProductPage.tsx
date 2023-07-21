import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TemplateShopPage from "components/TemplateShopPage/TemplateShopPage";
import { ClassBasket } from "utils/ClassBasket";
import Button from "components/Button/Button"
import FormInput from "components/FormInput/FormInput";
import styles from "./ProductPage.module.scss";
import { useBasketContext } from "context/BasketProvider";

export type IProduct = {
    id: number
    catrgoryId: number
    title: string;
    price: number;
    image: string;
}

export default function ProductPage() {
    const { productId } = useParams();
    const { onChangedBasket } = useBasketContext();

    const [product, setProduct] = useState<IProduct>();

    const [count, setCount] = useState(1);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/products/${productId}`).then((res) => setProduct(res.data));
    }, []);

    return (
        <TemplateShopPage>
            <div className={styles.ProductPage}>            
                <h1 className={styles.Title}>Товар: {product?.title} (#{productId})</h1>
                <div className={styles.CartProduct}>
                    <img src={product?.image} alt={product?.title} width={200} className={styles.Photo} />
                    <p><b>{product?.price}</b></p>
                </div>


                <FormInput
                    label="Кол-во"
                    value={count}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(+e.target.value)}
                />

                <Button onClick={() => {
                    if (productId && Number.isInteger(+productId)) {
                        ClassBasket.addProduct(+productId, count);
                        onChangedBasket();
                    }
                }}>
                    Добавить в корзину
                </Button>
            </div>

        </TemplateShopPage>
    )
}