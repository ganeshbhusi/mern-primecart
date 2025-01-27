import { useProductStore } from "@/store/product";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { CiMail, CiShoppingCart, CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { cartProducts, getCartProductsCount } = useProductStore();
  return (
    <Container
      bg={"burlywood"}
      p={6}
      borderBottomLeftRadius={4}
      borderBottomRightRadius={4}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
        >
          <Link to={"/"}>PrimeCart 🛒</Link>
        </Text>
        <HStack wordSpacing={2} alignItems={"center"}>
          <Link to="/createProduct">
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Link to="/contact">
            <Button>
              <CiMail />
            </Button>
          </Link>
          <Link to="/cart">
            <Button>
              <CiShoppingCart />
              {cartProducts.length > 0 && <sup>{getCartProductsCount()}</sup>}
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
