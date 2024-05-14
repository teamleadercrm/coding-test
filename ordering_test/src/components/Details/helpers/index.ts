import _ from "lodash";
import { GetOrderTypes } from "../../../api/types";
import { ProductsTypes } from "../../Products/types";

export const incrQuantity = (index: number, dataOrder: GetOrderTypes ) => {
    if(dataOrder) {
        const tempOrder = {...dataOrder};
        let quantity = tempOrder!.items[index].quantity;
        let totalItem = tempOrder!.items[index].total;
        let unitPrice =  tempOrder!.items[index]["unit-price"];
        let totalOrder = tempOrder!.total;

        tempOrder!.items[index].quantity = (parseInt(quantity) + 1).toString() ;
        tempOrder!.items[index].total = (parseFloat(totalItem) + parseFloat(unitPrice)).toFixed(2).toString();
        tempOrder!.total = (parseFloat(totalOrder) + parseFloat(unitPrice)).toFixed(2).toString();
        return tempOrder;
    }
}

export const decrQuantity = (index: number, dataOrder: GetOrderTypes) => {
    if(dataOrder) {
        const tempOrder = {...dataOrder};
        let quantity = tempOrder!.items[index].quantity;
        let totalItem = tempOrder!.items[index].total;
        let unitPrice =  tempOrder!.items[index]["unit-price"];
        let totalOrder = tempOrder!.total;

        tempOrder!.items[index].quantity = (parseInt(quantity) - 1).toString() ;
        tempOrder!.items[index].total = (parseFloat(totalItem) - parseFloat(unitPrice)).toFixed(2).toString();
        tempOrder!.total = (parseFloat(totalOrder) - parseFloat(unitPrice)).toFixed(2).toString();
        return tempOrder;
    }
}

export const removeItem = (index: number, dataOrder: GetOrderTypes) => {
    if(dataOrder) {
        const tempOrder = {...dataOrder};
        let totalOrder = tempOrder!.total;
        let totalItem = tempOrder!.items[index].total;

        tempOrder.total = (parseFloat(totalOrder) - parseFloat(totalItem)).toFixed(2).toString();
        tempOrder.items.splice(index, 1);
        return tempOrder;
    }
}

export const addUpdateItem = (dataOrder: GetOrderTypes | undefined, item: ProductsTypes) => {
    if(dataOrder) {
        const tempOrder = {...dataOrder};
        const exists = tempOrder.items.findIndex(dItem => dItem["product-id"] === item.id);
        if(exists > -1){
            return incrQuantity(exists, tempOrder)
        } else {
            tempOrder.items.push({
                "product-id": item.id,
                "quantity": "1",
                "unit-price": item.price,
                "total": item.price,
            })
            tempOrder.total = (parseFloat(tempOrder.total) + parseFloat(item.price)).toFixed(2).toString();
        }
        return tempOrder
    }

}

export const isObjectDiff = (obj1: any, obj2: any) => {
    if(!_.isEmpty(obj1) && !_.isEmpty(obj2)){
        const diff = Object.keys(obj1).reduce((result, key) => {
            if (!obj2.hasOwnProperty(key)) {
                result.push(key);
            } else if (_.isEqual(obj1[key], obj2[key])) {
                const resultKeyIndex = result.indexOf(key);
                result.splice(resultKeyIndex, 1);
            }
            return result;
        }, Object.keys(obj2));

        return diff.length > 0 ? true : false;
    } else return false;
}