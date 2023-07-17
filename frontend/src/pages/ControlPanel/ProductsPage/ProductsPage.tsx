import axios from "axios";
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import FormInput from "components/FormInput/FormInput";
import TemplateControlPanelPage from "components/TemplateControlPanelPage/TemplateControlPanelPage";
import { useEffect, useState } from "react";

export default function ProductsPage() {
    const [timestamp, setTimestamp] = useState(new Date().getTime()); // 15888
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [categoryId, setCategoryId] = useState(1);

    const [valueNewTitle, setValueNewTitle] = useState("");
    const [valueNewUrlImage, setValueNewUrlImage] = useState("");
    const [valueNewPrice, setValueNewPrice] = useState(0);

    const [id, setId] = useState(0);
    const [valueEditTitle, setValueEditTitle] = useState("");
    const [valueEditUrlImage, setValueEditUrlImage] = useState("");
    const [valueEditPrice, setValueEditPrice] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:9090/categories").then((res) => {
            setCategories(res.data);
            if (res.data.length > 0) setCategoryId(res.data[0].id);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:9090/products?categoryId=${categoryId}`).then((res) => setProducts(res.data));
    }, [timestamp, categoryId]);

    return (
        <TemplateControlPanelPage>
            <label>Chose category</label>
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(+e.target.value)}
            >
                {categories.map(({id, title}) => (
                    <option value={id} key={id}>{title}</option>
                ))}
            </select>

            <table border={1} width="100%">
                <colgroup>
                    <col width={1} />
                    <col width={1} />
                    <col width="auto" />
                    <col width={1} />
                    <col width={1} />
                    <col width={1} />
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Фото</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(({id, title, image, price}, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <th><img src={image} alt="" height={50} /></th>
                            <td>{title}</td>
                            <td>{price}&nbsp;руб.</td>
                            <td>
                                <Button onClick={() => {
                                    setId(id);
                                    setValueEditTitle(title)
                                    setValueEditUrlImage(image)
                                    setValueEditPrice(price);
                                }}>
                                    Редактировать
                                </Button>
                            </td>

                            <td>
                                <Button onClick={() => {
                                    const isAccept = window.confirm(`Удалить категории: ${title}?`);
                                    if (isAccept) {
                                        axios.delete(`http://localhost:9090/products/${id}`)
                                            .then((res) => setTimestamp(new Date().getTime()))
                                            .catch((error) => window.alert(error.response.data));
                                    }
                                }}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />
            <Form width={"100%"}>
                <h2>Форма создания</h2>
                <FormInput
                    label="Название товара"
                    value={valueNewTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValueNewTitle(e.target.value);
                    }}
                />

                <FormInput
                    label="Ссылка на картинку"
                    value={valueNewUrlImage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValueNewUrlImage(e.target.value);
                    }}
                />

                <FormInput
                    label="Цена"
                    value={valueNewPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValueNewPrice(+e.target.value);
                    }}
                />

                <Button 
                    type="button"
                    onClick={() => {
                        if (valueNewTitle.length > 0) {
                            axios.post(`http://localhost:9090/products`, {categoryId, title: valueNewTitle, image: valueNewUrlImage, price: valueNewPrice})
                                .then((res) => {
                                    setValueNewTitle("")
                                    setValueNewUrlImage("")
                                    setValueNewPrice(0);
                                    setTimestamp(new Date().getTime())
                                })
                                .catch((error) => window.alert(error.response.data));
                        }
                        
                    }}>Добавить</Button>
            </Form>

            <br />
            {id !== 0 && (
                <Form width={"100%"}>
                    <h2>Форма редактирования</h2>
                    <FormInput
                        label="Название товара"
                        value={valueEditTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValueEditTitle(e.target.value);
                        }}
                    />

                    <FormInput
                        label="Ссылка на картинку"
                        value={valueEditUrlImage}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValueEditUrlImage(e.target.value);
                        }}
                    />

                    <FormInput
                        label="Цена"
                        value={valueEditPrice}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValueEditPrice(+e.target.value);
                        }}
                    />

                    <Button 
                        type="button"
                        onClick={() => {
                            if (valueEditTitle.length > 0) {
                                axios.patch(`http://localhost:9090/products`, {categoryId, id, title: valueEditTitle, image: valueEditUrlImage, price: valueEditPrice})
                                    .then((res) => {
                                        setTimestamp(new Date().getTime())
                                    })
                                    .catch((error) => window.alert(error.response.data));
                            }
                            
                        }}>Изменить</Button>
                </Form>
            )}
            

        </TemplateControlPanelPage>
    )
}