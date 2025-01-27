import { useProductStore } from "@/store/product";
import { CartProduct } from "@/types/products";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = (props: CartItemProps) => {
  const { product } = props;
  const { increaseCartProductQuantity, decreaseCartProductQuantity } =
    useProductStore();
  return (
    <Container
      borderColor={"blackAlpha.400"}
      borderBottomWidth={1}
      boxShadow={"2xl"}
      boxShadowColor={"white"}
      bgColor={"coral"}
      borderRadius={4}
      p={4}
    >
      <Flex direction="row" justifyContent={"space-between"} p={1}>
        <Box flex={"1"}>
          <Text>{product.name}</Text>
          <Text textStyle={"xs"}>Price: $ {product.price}</Text>
        </Box>
        <Button
          variant={"plain"}
          onClick={() => decreaseCartProductQuantity(product._id!, true)}
        >
          <BsTrash />
        </Button>
      </Flex>
      <Flex
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        p={1}
      >
        <Text>Total: $ {+product.price * product.count}</Text>

        <Box float={"right"}>
          <Button
            p={0}
            onClick={() => decreaseCartProductQuantity(product._id!)}
          >
            <CiSquareMinus />
          </Button>
          <Button variant="plain" cursor={"menuitem"}>
            {product.count}
          </Button>
          <Button
            p={0}
            onClick={() => increaseCartProductQuantity(product._id!)}
          >
            <CiSquarePlus />
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default CartItem;
