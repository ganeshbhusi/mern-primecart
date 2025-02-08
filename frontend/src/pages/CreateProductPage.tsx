import { toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/auth";
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
  imageUrl: "",
  creatorId: "",
};

const CreateProductPage = () => {
  const { loggedInData } = useAuthStore();
  const { createProduct } = useProductStore();
  const [product, setProduct] = useState({
    ...productInitialState,
    creatorId: loggedInData.username,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = useCallback(async () => {
    setIsLoading(true);

    const { success, message } = await createProduct(product);
    toaster.create({
      title: message ?? "Product added successfully",
      type: success ? "success" : "error",
    });
    if (success) {
      setProduct({ ...productInitialState, creatorId: loggedInData.username });
    }
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
        w={{ base: "full", sm: "1/2", md: "1/2", lg: "1/3" }}
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
                required
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
                required
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
                required
              />
              <Text>
                Product Image Url{" "}
                <sup>
                  (
                  <a
                    href={`https://www.google.com/search?q=${
                      product.name ? product.name : "iphone"
                    }&udm=2`}
                    target="_blank"
                  >
                    get from google
                  </a>
                  )
                </sup>
              </Text>
              <Input
                name="image url"
                placeholder="Ex. https://www.google.com/img/product.jpg"
                type="text"
                min={1}
                value={product.imageUrl}
                onChange={(evt) =>
                  setProduct({ ...product, imageUrl: evt.target.value })
                }
                required
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
