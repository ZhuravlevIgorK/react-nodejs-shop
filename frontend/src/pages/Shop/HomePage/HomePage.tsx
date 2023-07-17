import { useNavigate } from "react-router-dom";
import TemplateShopPage from "../../../components/TemplateShopPage/TemplateShopPage";

export default function HomePage() {
    return (
        <TemplateShopPage>
            <h1>Вы успешно авторизовались и находтесь на главной странице</h1>
        </TemplateShopPage>
    )
}