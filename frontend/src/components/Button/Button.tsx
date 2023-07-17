import React from "react";
import styles from './Button.module.scss';

type IProps = React.HTMLProps<HTMLButtonElement> & {
    type?: "button" | "submit"
};

export default function Button({children, ...props}: IProps) {
    return (
        <button {...props} className={styles.Button}>
            { children }
        </button>
    )
}