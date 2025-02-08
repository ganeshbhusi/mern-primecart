import ProductCard from "@/components/ProductCard";
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import { Product } from "@/types/products";
import {
  Alert,
  Container,
  Input,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";

const HomePage = () => {
  const { products, getProducts, deleteProduct } = useProductStore();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteProduct = useCallback(async (product: Product) => {
    if (confirm("Are you sure you want to delete?")) {
      try {
        const { success, message } = await deleteProduct(product);
        toaster.create({
          title: !success ? "Error Deleting!" : "Deleted",
          description: message ?? "Product deleted succesfully!",
          type: "error",
        });
      } catch (err: any) {
        toaster.create({
          title: "Try again!",
          description: err?.data?.message ?? "Failed to delete product",
          type: "error",
        });
      }
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, products]);

  return (
    <Container p={"4"} maxW={"breakpoint-md"} py={4}>
      <Input
        marginBottom={"2"}
        bgColor={"white"}
        value={searchText}
        placeholder="Start searching..."
        onChange={(evt) => setSearchText(evt.target.value)}
        _hover={{ borderWidth: 0 }}
        _active={{ borderWidth: 0 }}
      />
      {!filteredProducts?.length && (
        <Alert.Root w={"full"} mt={"20"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {!!searchText
                ? "No search items found"
                : "No products in the store yet"}
            </Alert.Title>
            <Alert.Description>
              <Text>
                Add products to the store by{" "}
                <Link
                  variant="underline"
                  href="/createProduct"
                  colorPalette="teal"
                >
                  clicking here
                </Link>
              </Text>
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      <SimpleGrid columns={{ base: 2, md: 2, lg: 3, sm: 2 }} flex={1} gap={4}>
        {Array.isArray(filteredProducts) &&
          filteredProducts?.map((item: Product) => (
            <ProductCard
              key={item._id}
              product={item}
              onClickDelete={handleDeleteProduct}
            />
          ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
