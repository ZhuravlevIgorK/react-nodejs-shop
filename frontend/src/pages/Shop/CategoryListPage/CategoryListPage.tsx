import { useEffect, useState } from "react";
import axios from "axios";
import TemplateShopPage from "components/TemplateShopPage/TemplateShopPage";
import { NavLink } from "react-router-dom";


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
                            <NavLink to={`/list-products/${id}`}>{title}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </TemplateShopPage>
    )
}