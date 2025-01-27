import CartItem from "@/components/CartItem";
import { useProductStore } from "@/store/product";
import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
// import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartProducts, getCartProductsCount, getCartProductsPrice } =
    useProductStore();
  return (
    <Container>
      <Center flexDir={"column"}>
        {cartProducts.length === 0 ? (
          <Alert.Root w={"1/2"} mt={"20"}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Your cart is empty!</Alert.Title>
              <Alert.Description>
                <Text>
                  Add products to the cart by{" "}
                  <Link variant="underline" href="/" colorPalette="teal">
                    clicking here
                  </Link>
                </Text>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : (
          <Box
            w={"full"}
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
            <Flex
              gap={"1"}
              direction={"column"}
              w={"1/2"}
              mt={"4"}
              borderRadius={4}
            >
              {Array.isArray(cartProducts) &&
                cartProducts.map((item) => (
                  <CartItem key={item._id} product={item} />
                ))}
            </Flex>
            <Flex
              mt={8}
              flexDirection={"row"}
              justifyContent={"space-between"}
              style={{ width: "50%" }}
              alignItems={"flex-end"}
            >
              <Box>
                <Text textStyle="xl">Order Summary</Text>
                <Text>Items: {getCartProductsCount()}</Text>
                <Text>Items total price: ${getCartProductsPrice()}</Text>
              </Box>
              <Button>Checkout</Button>
            </Flex>
          </Box>
        )}
      </Center>
    </Container>
  );
};

export default CartPage;
