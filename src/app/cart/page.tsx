// Role: Shopping cart page with quantity controls, remove buttons, and toast notifications

"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useToastStore } from "@/stores/toast-store";
import Container from "@/components/layout/Container";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const { showToast } = useToastStore();
  const totalPrice = getTotalPrice();

  /* ===== Handle Remove Single Item with Toast ===== */
  const handleRemoveItem = (itemId: number, itemTitle: string) => {
    console.log("Removing item:", itemTitle);
    removeItem(itemId);
    showToast(`${itemTitle} removed from cart`, "cart");
    console.log("Toast shown for removal");
  };

  /* ===== Handle Clear Cart with Toast ===== */
  const handleClearCart = () => {
    console.log("Clearing cart");
    clearCart();
    showToast("Cart cleared", "cart");
    console.log("Toast shown for clear cart");
  };

  /* ===== Handle Quantity Update with Toast ===== */
  const handleUpdateQuantity = (itemId: number, newQuantity: number, itemTitle: string) => {
    console.log("Updating quantity:", itemTitle, "to", newQuantity);
    if (newQuantity === 0) {
      removeItem(itemId);
      showToast(`${itemTitle} removed from cart`, "cart");
      console.log("Toast shown for removal via quantity");
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  /* ===== Empty Cart State ===== */
  if (items.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven't added any items yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-sm hover:bg-primary-hover transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </Container>
    );
  }

  /* ===== Cart with Items ===== */
  return (
    <Container>
      <div className="py-8">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ===== Cart Items List ===== */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-sm shadow-md overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-600 dark:text-gray-300">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {/* Cart Items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700"
                >
                  {/* Product Info */}
                  <div className="md:col-span-6 flex gap-4">
                    <Link href={`/product/${item.id}`} className="cursor-pointer">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-sm overflow-hidden flex-shrink-0">
                        <img
                          src={item.images?.[0] || item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link href={`/product/${item.id}`} className="cursor-pointer">
                        <h3 className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.category}</p>
                      {/* Remove Button with Toast */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.title)}
                        className="inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-600 mt-2 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                    <span className="text-gray-900 dark:text-white font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Controls with Toast */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-sm">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.title)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-sm transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.title)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-sm transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                    <span className="text-lg font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button with Toast */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* ===== Order Summary Sidebar ===== */}
          <div className="lg:w-96">
            <div className="bg-white dark:bg-gray-800 rounded-sm shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <button className="w-full py-3 bg-primary text-white rounded-sm font-semibold hover:bg-primary-hover transition-colors cursor-pointer">
                  Proceed to Checkout
                </button>
              </Link>

              <Link href="/" className="block text-center text-sm text-primary hover:underline mt-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}