import React, { useEffect } from "react";
import styles from "./TemplateControlPanelPage.module.scss";
import { PATH } from "App";
import {NavLink} from "react-router-dom"
import Button from "components/Button/Button";
import { ClassBasket } from "../../utils/ClassBasket";
import { useBasketContext } from "../../context/BasketProvider";

type IProps = React.PropsWithChildren<{}>;

const className = ({isActive, isPending}: any) => isActive ? styles.active : undefined

export default function TemplateControlPanelPage({ children }: IProps) {
    const {basket, onChangedBasket} = useBasketContext();
    const isAuth = localStorage.getItem("isAuth");
    return (
        <div className={styles.Container}>
            {isAuth && (
                 <header className={styles.Header}>
                    <nav>
                        <NavLink to={PATH.CONTROL_PANEL.CATEGORIES} className={className}>Категории</NavLink>
                        <NavLink to={PATH.CONTROL_PANEL.PRODUCTS} className={className}>Товар</NavLink>
                    </nav>
                    <nav><Button onClick={() => {
                        localStorage.removeItem("isAuth");
                        window.location.href = PATH.CONTROL_PANEL.AUTH;
                    }}>Выйти</Button></nav>
                </header>
            )}
           
            <main className={styles.Main}>{children}</main>
            <footer className={styles.Footer}>
                &copy; Все права защищены: 2022 - {new Date().getFullYear()} год.
            </footer>
        </div>
    )
}