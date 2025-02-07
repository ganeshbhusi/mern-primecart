import { useAuthStore } from "@/store/auth";
import { useProductStore } from "@/store/product";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import {
  CiLogin,
  CiLogout,
  CiMail,
  CiShoppingCart,
  CiSquarePlus,
} from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { cartProducts, getCartProductsCount } = useProductStore();
  const { isLoggedIn, clearLoginData } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (isLoggedIn) {
      clearLoginData();
      navigate("/login");
    }
  };
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
          <sub>Test</sub>
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

          <Link to="/login">
            <Button onClick={handleLogout} backgroundColor={"red.600"}>
              {isLoggedIn ? <CiLogout /> : <CiLogin />}
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
