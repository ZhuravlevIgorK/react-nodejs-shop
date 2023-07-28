import axios from "axios";
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import FormInput from "components/FormInput/FormInput";
import TemplateControlPanelPage from "components/TemplateControlPanelPage/TemplateControlPanelPage";
import { useBasketContext } from "context/BasketProvider";
import React, { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [timestamp, setTimestamp] = useState(new Date().getTime()); // 15888
    const [categories, setCategories] = useState([]);

    const [valueNewCategory, setValueNewCategory] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/categories`).then((res) => setCategories(res.data))
    }, [timestamp]);

    return (
        <TemplateControlPanelPage>
            <table border={1} width="100%">
                <colgroup>
                    <col width={1} />
                    <col width="auto" />
                    <col width={1} />
                    <col width={1} />
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Назание</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(({id, title}, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{title}</td>
                            <td>
                                <Button onClick={() => {
                                    const newTitle = window.prompt("Ввдение название категории", title);
                                    if (newTitle) {
                                        axios.patch(`${process.env.REACT_APP_BACKEND}/categories`, {id: id, title: newTitle})
                                            .then((res) => setTimestamp(new Date().getTime()))
                                            .catch((error) => window.alert(error.response.data));
                                    }
                                }}>
                                    Редактировать
                                </Button>
                            </td>

                            <td>
                                <Button onClick={() => {
                                    const isAccept = window.confirm(`Удалить категории: ${title}?`);
                                    if (isAccept) {
                                        axios.delete(`${process.env.REACT_APP_BACKEND}/categories/${id}`)
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
                <FormInput
                    label="Новая категория"
                    value={valueNewCategory}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValueNewCategory(e.target.value)
                    }}
                />

                <Button 
                    type="button"
                    onClick={() => {
                        if (valueNewCategory.length > 0) {
                            axios.post(`${process.env.REACT_APP_BACKEND}/categories`, {title: valueNewCategory})
                                .then((res) => setTimestamp(new Date().getTime()))
                                .catch((error) => window.alert(error.response.data));
                        }
                        
                    }}>Добавить</Button>
            </Form>

        </TemplateControlPanelPage>
    )
}