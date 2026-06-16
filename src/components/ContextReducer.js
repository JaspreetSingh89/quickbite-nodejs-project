import React, { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case("ADD"):
            return [
              ...state,
              {
                id: action.id,
                name: action.name,
                price: action.price,
                qty: action.qty,
                size: action.size,
              },
            ];
        case("UPDATE"):
            return state.map((item)=>
                item.id === action.id && item.size === action.size ? {
                    ...item,
                    qty: parseInt(item.qty) + parseInt(action.qty),
                    price: parseInt(item.price) + parseInt(action.price)
                }: item
            )
        case("REMOVE"):
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        default:
            return state;
    }   
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
