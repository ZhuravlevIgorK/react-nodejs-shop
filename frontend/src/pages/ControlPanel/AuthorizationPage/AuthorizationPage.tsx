import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import FormInput from "../../../components/FormInput/FormInput";
import axios, { AxiosError } from "axios"
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateControlPanelPage from "components/TemplateControlPanelPage/TemplateControlPanelPage";
import { PATH } from "App";

export default function AuthorizationPage() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [messageError, setMessageError] = useState("");

    return (
        <TemplateControlPanelPage>
            <Form width={320}>
                <h1>Страница авторизации</h1>

                <FormInput 
                    label="Логин"
                    type="text"
                    value={login}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                />
                
                <FormInput 
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                {messageError}

                <Button 
                    type="button" 
                    onClick={async () => {
                        setMessageError("");
                        try {
                            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/sign-in`, {login: login, password: password});
                            localStorage.setItem("isAuth", "true");
                            localStorage.setItem("timestamp", new Date().toLocaleString());
                            navigate(PATH.CONTROL_PANEL.CATEGORIES, {replace: true});
                            window.location.reload();
                        } catch (error: any) {
                            setMessageError(error.response?.data.message || error.message);
                        }
                    }}
                >
                    Авторизация
                </Button>
            </Form>
        </TemplateControlPanelPage>
    );
}