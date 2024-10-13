import { HomeIcon, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import CartWrapper from "./CartWrapper";
import { getCartItems } from "@/store/shop/cart-slice";

const ShoppingHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartItems(user?._id));
  }, [dispatch]);

  const handleNavigatNavbar = (getCurrentMemuItem) => {
    sessionStorage.removeItem("filter");
    const currentFilter =
      getCurrentMemuItem.id !== "home"
        ? {
            category: [getCurrentMemuItem.id],
          }
        : null;

        sessionStorage.setItem("filter", JSON.stringify(currentFilter))
        navigate(getCurrentMemuItem.path)
  };

  const MenuItem = () => {
    return (
      <nav className="flex flex-col mb-3 lg:items-center gap-6 lg:flex-row">
        {shoppingHeaderMenuItems.map((menuItem) => (
          <label
            key={menuItem.id}
            onClick={() => handleNavigatNavbar(menuItem)}
            className="text-sm font-medium cursor-pointer"
          >
            {menuItem.label}
          </label>
        ))}
      </nav>
    );
  };

  const HearderRight = () => {
    return (
      <div className="flex items-center gap-4 justify-between">
        <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
          <Button
            onClick={() => setOpenCart(true)}
            variant="outline"
            size="icon"
          >
            <ShoppingCart className="size-6" />
            <span className="sr-only">User cart</span>
          </Button>
          <CartWrapper
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
                {user.fullname[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>{user.fullname}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/shop/account")}
              className="cursor-pointer"
            >
              <UserCog className="mr-2 size-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => dispatch(logoutUser())}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HomeIcon className="size-6" />
          <span className="font-bold">E-Fyntrix</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <SheetTitle>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="size-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTitle>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItem />
            <HearderRight />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItem />
        </div>

        <div className="hidden lg:block">
          <HearderRight />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
