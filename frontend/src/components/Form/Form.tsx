import React from "react"
import styles from "./Form.module.scss"

type IProps = React.HTMLProps<HTMLFormElement> & {
    width: number | string;
};

export default function Form({width, children, ...props}: IProps) {
    return (
        <form {...props} className={styles.Form} style={{ width: width }}>
            { children }
        </form>
    )
}
