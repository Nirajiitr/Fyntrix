import {
  HomeIcon,
  LogOut,
  Menu,
  SearchIcon,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import CartWrapper from "./CartWrapper";
import { getCartItems } from "@/store/shop/cart-slice";
import { Input } from "../ui/input";
import brandLogo from "../../assets/logo.png";
import toast from "react-hot-toast";

const redirectIfDefault = (pageLocation, navigate, action) => {
  if (pageLocation === "default") {
    navigate("/auth/login");
  } else {
    action();
  }
};

const ShoppingHeader = ({ pageLocation }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    redirectIfDefault(pageLocation, navigate, () => {
      if (searchText !== "") {
        navigate(`/shop/search?q=${searchText}`);
      }
    });
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(getCartItems(user._id)).catch((err) => {
        console.error("Failed to load cart items", err);
      });
    }
  }, [dispatch, user]);

  const handleNavigatNavbar = (getCurrentMemuItem) => {
    redirectIfDefault(pageLocation, navigate, () => {
      sessionStorage.removeItem("filter");
      const currentFilter =
        getCurrentMemuItem.id !== "home" && getCurrentMemuItem.id !== "products"
          ? {
              category: [getCurrentMemuItem.id],
            }
          : null;

      sessionStorage.setItem("filter", JSON.stringify(currentFilter));
      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${getCurrentMemuItem.id}`)
          )
        : navigate(getCurrentMemuItem.path);
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/auth/login");
    toast.success("logout successfully");
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
      <div className="flex items-center gap-2 sm:gap-4 justify-between">
        <Sheet
          open={openCart}
          onOpenChange={() => {
            redirectIfDefault(pageLocation, navigate, () => setOpenCart(false));
          }}
        >
          <Button
            onClick={() => {
              redirectIfDefault(pageLocation, navigate, () =>
                setOpenCart(true)
              );
            }}
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:size-10 relative"
          >
            <ShoppingCart className="size-4 sm:size-6" />
            <span className="sr-only">User cart</span>
            <span className="absolute -top-4 -right-1 p-1 text-red-500 bg-white rounded-full">
              {cartItems?.items?.length}
            </span>
          </Button>
          <CartWrapper
            setOpenCart={setOpenCart}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black h-7 w-7 sm:size-10">
              <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
                {user?.fullname[0].toUpperCase() || (
                  <img src={brandLogo} alt="brand logo" />
                )}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          {pageLocation !== "default" && (
            <DropdownMenuContent side="bottom" className="w-56">
              <DropdownMenuLabel>{user?.fullname}</DropdownMenuLabel>
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
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    );
  };

  return (
    <header className=" w-full border-b bg-background">
      <div className="flex sm:h-16 h-12 items-center justify-between px-1 sm:px-4 md:px-6 gap-2 ">
        <Link to="/shop/home" className="flex min-w-fit items-center gap-2">
          
          <span className="font-bold">E-Fyntrix</span>
        </Link>
        <div className="w-full inline-block">
          <div className="relative w-full max-w-sm">
            <Input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className="h-7 sm:h-10 pr-7 sm:pr-10"
            />
            <SearchIcon
              onClick={handleSearch}
              className="absolute size-4 sm:size-6 cursor-pointer right-2 top-[20%]"
            />
          </div>
        </div>
        <div className="lg:hidden">
          <HearderRight />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <SheetTitle>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden h-7 w-7 sm:size-10"
              >
                <Menu className="size-4 sm:size-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTitle>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-max">
            <MenuItem />
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
