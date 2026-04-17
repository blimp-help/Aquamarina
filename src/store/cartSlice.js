import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
addToCart: (state, action) => {
  const item = action.payload;

  const existing = state.items.find((i) => {
    if (item.type === "hotel") {
      return (
        i.id === item.id &&
        i.type === item.type &&
        i.checkIn === item.checkIn
      );
    }

    return (
      i.id === item.id &&
      i.type === item.type &&
      i.date === item.date
    );
  });
  
if (existing) {

  // ✅ PARK (all subtypes: single / group / family)
  if (item.type === "park") {

    existing.adults = (existing.adults || 0) + (item.adults || 0);
    existing.children = (existing.children || 0) + (item.children || 0);

    existing.quantity = existing.adults + existing.children;

    existing.total =
      (existing.adults * existing.price) +
      (existing.children * existing.childPrice);

  } else {
    // ✅ HOTEL / EVENT
    existing.quantity += item.quantity || 1;
  }

} else {

  // ✅ NEW ITEM
  if (item.type === "park") {

    const adults = item.adults || 0;
    const children = item.children || 0;

    state.items.push({
      ...item,
      adults,
      children,
      quantity: adults + children,
      total:
        (adults * item.price) +
        (children * item.childPrice),
    });

  } else {

    state.items.push({
      ...item,
      quantity: item.quantity || 1,
    });

  }
}
},

  increaseQuantity: (state, action) => {
  const { index, type } = action.payload;
  const item = state.items[index];

  if (!item) return;

  if (item.type === "park") {

    if (type === "adult") {
      item.adults += 1;
    } else if (type === "child") {
      item.children += 1;
    }

    item.quantity = item.adults + item.children;

  } else {
    item.quantity += 1;
  }
},

decreaseQuantity: (state, action) => {
  const { index, type } = action.payload;
  const item = state.items[index];

  if (!item) return;

  if (item.type === "park") {

    // ✅ get min based on subtype
    const min =
      item.subtype === "group" ? 10 :
      item.subtype === "family" ? 4 : 1;

    if (type === "adult" && item.adults > min) {
      item.adults -= 1;
    }

    if (type === "child" && item.children > 0) {
      item.children -= 1;
    }

    item.quantity = item.adults + item.children;

  } else {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
  }
},

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (_, index) => index !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;