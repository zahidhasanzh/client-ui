"use client";
import React, { useEffect } from "react";
import CartItem from "./cartItem";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getItemTotal } from "@/lib/utils";

const CartItems = () => {
  const searchParams = useSearchParams();
  const router = useRouter();


  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const cart = useAppSelector((state) => state.cart.cartItems);

  const finalTotal = React.useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + curr.qty * getItemTotal(curr);
    }, 0);
  }, [cart]);

  if (!isClient) {
    return null;
  }

  if (!cart.length) {
    return (
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <p className="text-gray-500">
          Your cart is empty!{" "}
          <Link
            className="text-orange-500"
            href={`/?restaurantId=${searchParams.get("restaurantId")}`}
          >
            continue shopping?
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 ">
      {cart.map((cartItem) => (
        <CartItem key={cartItem.hash} item={cartItem} />
      ))}
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">&#8377;{finalTotal}</span>
        <Button
          onClick={() =>
            router.push(
              `/checkout/?restaurantId=${searchParams.get("restaurantId")}`
            )
          }
        >
          Checkout
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
