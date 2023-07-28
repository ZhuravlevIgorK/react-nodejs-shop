import React, { useEffect } from "react";
import styles from "./TemplateShopPage.module.scss";
import {NavLink} from "react-router-dom"
import Button from "../Button/Button";
import { ClassBasket } from "../../utils/ClassBasket";
import { useBasketContext } from "../../context/BasketProvider";
import { PATH } from "global-config";

type IProps = React.PropsWithChildren<{}>;

const className = ({isActive, isPending}: any) => isActive ? styles.active : undefined

export default function TemplateShopPage({ children }: IProps) {
    const {basket, onChangedBasket} = useBasketContext();

    return (
        <div className={styles.Container}>
            <header className={styles.Header}>
                <nav>
                    <NavLink to={PATH.SHOP.HOME} className={className}>Главная</NavLink>
                    <NavLink to={PATH.SHOP.CATEGORIES} className={className}>Категории</NavLink>
                    <NavLink to={PATH.SHOP.GUARANTES} className={className}>Гарантии</NavLink>
                    <NavLink to={PATH.SHOP.ABOUT} className={className}>О Нас</NavLink>
                    <NavLink to={PATH.SHOP.CONTACTS} className={className}>Контакты</NavLink>
                </nav>
                <div className={styles.Basket}>
                    <NavLink to={PATH.SHOP.BASKET}>
                        &#x1F9FA; ({basket.length})
                    </NavLink>
                </div>
                <nav>
                    <NavLink to={PATH.CONTROL_PANEL.AUTH}>Авторизация</NavLink>
                    <NavLink to={PATH.CONTROL_PANEL.REGISTRATION}>Регистрация</NavLink>
                </nav>
            </header>
            <main className={styles.Main}>{children}</main>
            <footer className={styles.Footer}>
                &copy; Все права защищены: 2022 - {new Date().getFullYear()} год.
            </footer>
        </div>
    )
}