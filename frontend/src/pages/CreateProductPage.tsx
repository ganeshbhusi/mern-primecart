import { toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
  Button,
  Card,
  CardBody,
  Center,
  Fieldset,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";

const productInitialState = {
  name: "",
  price: "",
  quantity: "",
};

const CreateProductPage = () => {
  const { createProduct } = useProductStore();
  const [product, setProduct] = useState(productInitialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = useCallback(async () => {
    setIsLoading(true);

    const { success, message } = await createProduct(product);
    toaster.create({
      title: message ?? "Product added successfully",
      type: success ? "success" : "error",
    });
    setProduct({ ...productInitialState });
    setIsLoading(false);
  }, [product]);
  return (
    <Center
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
      <Card.Root
        marginTop={12}
        w={{ base: "-moz-fit-content", sm: "1/2", md: "1/2", lg: "1/3" }}
      >
        <CardBody>
          <Fieldset.Root size="lg" maxW="md" p={"8"}>
            <Stack>
              <Fieldset.Legend fontSize={"2xl"}>
                Product details
              </Fieldset.Legend>
              <Fieldset.HelperText>
                Enter the product details!
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Text>Product Name</Text>
              <Input
                name="name"
                placeholder="Ex. Karate Art"
                type="text"
                value={product.name}
                onChange={(evt) =>
                  setProduct({ ...product, name: evt.target.value })
                }
              />
              <Text>Price</Text>
              <Input
                name="price"
                placeholder="Ex. 99"
                type="number"
                min={1}
                value={product.price}
                onChange={(evt) =>
                  setProduct({ ...product, price: evt.target.value })
                }
              />
              <Text>Quantity</Text>
              <Input
                name="quantity"
                placeholder="Ex. 99"
                type="number"
                min={1}
                value={product.quantity}
                onChange={(evt) =>
                  setProduct({ ...product, quantity: evt.target.value })
                }
              />
            </Fieldset.Content>
            {isLoading ? (
              <Spinner size={"lg"} />
            ) : (
              <Button
                type="submit"
                alignSelf="flex-start"
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            )}
          </Fieldset.Root>
        </CardBody>
      </Card.Root>
    </Center>
  );
};

export default CreateProductPage;
