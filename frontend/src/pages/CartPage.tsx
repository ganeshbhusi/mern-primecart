import CartItem from "@/components/CartItem";
import { toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/auth";
import { useProductStore } from "@/store/product";
import { loadScript } from "@/utils/razorpay";
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
  const {
    cartProducts,
    getCartProductsCount,
    getCartProductsPrice,
    createOrderPayment,
    createOrderSuccess,
    clearCart,
  } = useProductStore();
  const { isLoggedIn } = useAuthStore();
  const processOrder = async () => {
    if (!isLoggedIn) {
      toaster.create({
        title: "Try again!",
        description: "You are not logged in",
        type: "error",
      });
      return;
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    // const result = await axios.post("http://localhost:5000/payment/orders");
    const result = await createOrderPayment({
      price: getCartProductsPrice() * 100,
    });
    console.log("@gb result: ", result);

    if (!result.success) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_WhDZN6iBSjUj3H",
      amount: amount.toString(),
      currency: currency,
      name: "Ganesh Pros",
      description: "Test Transaction",
      image: {
        logo: "https://i.pinimg.com/736x/68/3d/9a/683d9a1a8150ee8b29bfd25d46804605.jpg",
      },
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const { success, message } = await createOrderSuccess({ data });
        toaster.create({
          title: !success ? "Payment" : "Payment",
          description: message ?? "Product error!",
          type: !success ? "error" : "success",
        });
        if (success) {
          clearCart();
        }
      },
      prefill: {
        name: "Ganesh B ",
        email: "ganesh@example.com",
        contact: "9848946707",
      },
      notes: {
        address: "Ganesh Home",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
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
                <Text>Items total price: ₹{getCartProductsPrice()}</Text>
              </Box>
              <Button onClick={processOrder}>Checkout</Button>
            </Flex>
          </Box>
        )}
      </Center>
    </Container>
  );
};

export default CartPage;
