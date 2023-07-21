import { useEffect, useState } from "react";
import axios from "axios";
import TemplateShopPage from "components/TemplateShopPage/TemplateShopPage";


export default function CategoryListPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/categories`).then((res) => setCategories(res.data));
    }, []);

    return (
        <TemplateShopPage>
            <h1>Категории товаров</h1>
            <nav>
                <ul>
                    {categories.map(({id, title}) => (
                        <li>
                            <a href={`/products/${id}`}>{title}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </TemplateShopPage>
    )
}