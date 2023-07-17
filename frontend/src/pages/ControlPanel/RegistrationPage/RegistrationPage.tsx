import Button from "components/Button/Button";
import Form from "components/Form/Form";
import FormInput from "components/FormInput/FormInput";
import axios, { AxiosError } from "axios"
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateControlPanelPage from "components/TemplateControlPanelPage/TemplateControlPanelPage";

export default function RegistrationPage() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [messageError, setMessageError] = useState("");

    return (
        <TemplateControlPanelPage>
            <Form width={320}>
                <h1>Страница регистрации</h1>

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

                <FormInput 
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />

                {messageError}

                <Button 
                    type="button" 
                    onClick={async () => {
                        setMessageError("");
                        try {
                            const res = await axios.post("http://localhost:9090/auth/register", {login: login, password: password, email: email});
                            navigate("/authorization", {replace: true});
                        } catch (error: any) {
                            setMessageError(error.response?.data.message || error.message);
                        } 
                    }}
                >
                    Регистрация
                </Button>
            </Form>
        </TemplateControlPanelPage>
    );
}