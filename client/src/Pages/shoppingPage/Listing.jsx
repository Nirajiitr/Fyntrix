import ShoppingFilter from "@/components/Shopping/Filter";
import ShoppingProductCard from "@/components/Shopping/ProductCard";
import ProductDetails from "@/components/Shopping/ProductDetails";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sortOptions } from "@/config/index.js";
import { addItemsToCart, getCartItems } from "@/store/shop/cart-slice";
import {
  getAllFilterProduct,
  getProductDetails,
} from "@/store/shop/product-slice";
import { ArrowUpDownIcon, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
};

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const categorySearchParams = searchParams.get("category");
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        getAllFilterProduct({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);
  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        copyFilters[getSectionId].push(getCurrentOption);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filter", JSON.stringify(filters));
  };
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, [categorySearchParams]);

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(getProductDetails(getCurrentProductId));
    setOpenProductDetail(true);
  };

  const handleCartItem = (getCurrentProductId, totalStock) => {
    let getCurrentCartItems = cartItems.items || [];
    if (getCurrentCartItems.length) {
      const indexOfCurrentItem = getCurrentCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCurrentCartItems[indexOfCurrentItem].quantity;
        if (totalStock < 5) {
          if (getQuantity + 1 > totalStock) {
            toast.error(
              `Only ${getQuantity} quantity can be added for this moment`
            );
            return;
          }
        } else if (getQuantity + 1 > 5) {
          toast.error("max 5 quantity can be added for same product");
          return;
        }
      }
    }
    dispatch(
      addItemsToCart({
        userId: user._id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload?.message);
        setOpenProductDetail(false);
        dispatch(getCartItems(user?._id));
      }
    });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 p-2 md:p-6 ">
      <div className="hidden lg:inline-block">
        <ShoppingFilter filters={filters} handleFilter={handleFilter} />
      </div>

      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between ">
          <div className="flex gap-2 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <SheetTitle>
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden h-7 w-7 sm:size-10"
                  >
                    <Filter size="16px" />
                    <span className="sr-only">filter button</span>
                  </Button>
                </SheetTitle>
              </SheetTrigger>

              <SheetContent side="left" className="w-full max-w-max">
                <ShoppingFilter filters={filters} handleFilter={handleFilter} />
              </SheetContent>
            </Sheet>

            <h2 className="text-lg font-extrabold">All Products</h2>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="size-4" />
                  <span>sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      <span> {sortItem.label}</span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-full max-h-[75vh] overflow-hidden no-scrollbar overflow-y-scroll xl:grid-cols-3  gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <ShoppingProductCard
                key={product._id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleCartItem={handleCartItem}
              />
            ))
          ) : (
            <span className="text-muted-foreground">
              {productList.length} products
            </span>
          )}
        </div>
      </div>
      <ProductDetails
        open={openProductDetail}
        setOpen={setOpenProductDetail}
        productDetails={productDetails}
        handleCartItem={handleCartItem}
      />
    </div>
  );
};

export default ShoppingListing;
