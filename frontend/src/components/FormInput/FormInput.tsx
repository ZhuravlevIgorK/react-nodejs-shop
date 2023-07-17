import React from "react";
import styles from "./FormInput.module.scss";

type IProps = React.HTMLProps<HTMLInputElement> & {
    label: string;
}

export default function FormInput({label, ...props}: IProps) {
    return (
        <div className={styles.FormInput}>
            <label>{label}</label>
            <input {...props} autoComplete="off" />
        </div>
    )
}

