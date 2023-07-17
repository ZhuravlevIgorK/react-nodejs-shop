import React, { useContext, useState } from "react";
import { ClassBasket, IProductOfBasket } from "../utils/ClassBasket";

type IProps = React.PropsWithChildren;

type IContext = {
    basket: Array<IProductOfBasket>
    onChangedBasket(): void;
}

const Context = React.createContext<IContext>({
    basket: [],
    onChangedBasket() {},
});

export const useBasketContext = () => useContext(Context);

export default function BasketProvider({ children }: IProps) {
    const [basket, setBasket] = useState<IProductOfBasket[]>(ClassBasket.getArrayBasket());

    const onChangedBasket = () => {
        let arrBasket = ClassBasket.getArrayBasket(); 
        setBasket(arrBasket);
    }
    
    return (
        <Context.Provider value={{
            basket,
            onChangedBasket,
        }}>
            {children}
        </Context.Provider>
    )
}
