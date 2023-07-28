export type IProductOfBasket = {
    id: number,
    count: number,
}

/** 
 * Класс по работк с козиной
*/
export class ClassBasket {
    /** 
     * Получить массив всей корзины со всеми товарами
     * @param {number} id - ид товара
     * @param {number} count - кол-во товара
     * @return {array} array - [{id: 1, count: 1}, {id: 2, count: 5}]
    */
    static getArrayBasket() {
        let strBasket = localStorage.getItem("basket") || "[]"; // "[]" | "[{id: 1, count: 1}, {id: 2, count: 5}]"
        let arrBasket = JSON.parse(strBasket) as Array<IProductOfBasket>; // [] | [{id: 1, count: 1}, {id: 2, count: 5}]
        return arrBasket;
    }

    /** 
     * Добавить товар в корзины
     * @param {number} id - ид товара
     * @param {number} count - кол-во товара
     * @return {void}
    */
    static addProduct(id: number, count: number) { // id - это индификатор товара, count - ко-во товара в корзине
        let arrBasket = ClassBasket.getArrayBasket();
        
        let itemProductOfBasket = arrBasket.find((item) => item.id === id); // undifined | {id: 2, count: 5} (проверяем, содержится ли товар в корзину) (был ли товар ранее добавлен в корзину)
        if (itemProductOfBasket) { 
            itemProductOfBasket.count += count;
        } else {
            arrBasket.push({id, count});
        }

        localStorage.setItem("basket", JSON.stringify(arrBasket));
    }

    /** 
     * метод по удалению товара из корзины
     * @param {number} id - ид товара
     * @param {number} count - кол-во товара
     * @return {void}
    */
    static removeProduct(id: number, count: number) {
        let arrBasket = ClassBasket.getArrayBasket();

        let itemProductOfBasket = arrBasket.find((item) => item.id === id); // undifined | {id: 2, count: 5} (проверяем, содержится ли товар в корзину) (был ли товар ранее добавлен в корзину)
        if (itemProductOfBasket) { 
            itemProductOfBasket.count -= count;
            arrBasket = arrBasket.filter(item => item.count > 0);
        }

        localStorage.setItem("basket", JSON.stringify(arrBasket));
    }

    /** 
     * метод по очистки корзины
     * @return {void}
    */
    static clearBasket() {
        localStorage.setItem("basket", "[]");
    }

    /** 
     * метод возращает общее кол-во товаров
     * @return {number}
    */
    static getTotalCountProducts() {
        let strBasket = localStorage.getItem("basket") || "[]"; // "[]" | "[{id: 1, count: 1}, {id: 2, count: 5}]"
        let arrBasket = JSON.parse(strBasket) as Array<IProductOfBasket>; // [] | [{id: 1, count: 1}, {id: 2, count: 5}]
        return arrBasket.reduce((sum, item) => sum + item.count, 0);
    }
}
