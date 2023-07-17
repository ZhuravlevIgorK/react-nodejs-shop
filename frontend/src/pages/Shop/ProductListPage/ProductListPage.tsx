import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TemplateShopPage from "../../../components/TemplateShopPage/TemplateShopPage";

export default function ProductListPage() {
    const { categoryId } = useParams(); // 1 (categoryId - это id категории из ссылки страницы /categories)

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9090/products?categoryId=${categoryId}`).then((res) => setProducts(res.data));
    }, [])

    return (
        <TemplateShopPage>
            <h1>Список товаров категории: {categoryId}</h1>
            <nav>
                <ul>
                    {products.map(({id, title, price, image}) => (
                        <li>
                            <a href={`/product/${id}`}>
                                <img src={image} width={100} />
                                <b>{title}</b>
                                <small>{price}</small>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </TemplateShopPage>
    )
}