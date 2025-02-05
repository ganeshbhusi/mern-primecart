import { useProductStore } from "@/store/product";
import { Product } from "@/types/products";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { CiEdit, CiTrash } from "react-icons/ci";
import ProductUpdateModal from "./ProductUpdate.modal";
import { toaster } from "./ui/toaster";

interface ProductCardProps {
  product: Product;
  onClickDelete: (product: Product) => void;
}
const ProductCard = ({ product, onClickDelete }: ProductCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { updateProduct, addToCart, isProductInCart } = useProductStore();
  const isProductAddedToCart = isProductInCart(product._id!);

  const handleUpdateProduct = useCallback(
    async (product: Product) => {
      const { success, message } = await updateProduct(product);
      toaster.create({
        title: success ? "Product updated" : "Error",
        description: message,
        type: success ? "success" : "error",
      });
      setIsVisible(false);
    },
    [updateProduct]
  );

  const onAddToCart = async () => {
    await addToCart(product);
  };

  return (
    <>
      <Box
        data-state="open"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "300ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
      >
        <Card.Root>
          <CardBody>
            <CardHeader>{product.name}</CardHeader>
            <CardDescription p={0} m={0}>
              ₹ {product.price} - Qty: {product.quantity}
            </CardDescription>
          </CardBody>
          <CardFooter
            flexDir={"row"}
            justifyContent={"space-around"}
            marginTop={2}
            paddingBottom={2}
          >
            <Button
              size={"2xs"}
              bgColor={"fg.info"}
              onClick={() => setIsVisible(true)}
            >
              <CiEdit />
            </Button>
            <Button
              size={"2xs"}
              bgColor={"fg.error"}
              onClick={() => onClickDelete(product)}
            >
              <CiTrash />
            </Button>
            {!isProductAddedToCart ? (
              <Button size={"2xs"} bgColor={"fg.muted"} onClick={onAddToCart}>
                <BsCartPlusFill />
              </Button>
            ) : (
              <Button size={"2xs"} bgColor={"fg.error"} onClick={onAddToCart}>
                <BsCartCheckFill />
              </Button>
            )}
          </CardFooter>
        </Card.Root>
        <ProductUpdateModal
          product={product}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onUpdate={handleUpdateProduct}
        />
      </Box>
    </>
  );
};

export default ProductCard;
