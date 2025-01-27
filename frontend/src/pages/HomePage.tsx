import ProductCard from "@/components/ProductCard";
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import { Product } from "@/types/products";
import { Alert, Container, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";

const HomePage = () => {
  const { products, getProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleDeleteProduct = useCallback(async (product: Product) => {
    const { success, message } = await deleteProduct(product);
    toaster.create({
      title: !success ? "Error Deleting!" : "Deleted",
      description: message ?? "Product deleted succesfully!",
      type: "error",
    });
  }, []);

  return (
    <Container p={"4"} maxW={"xl"} py={12}>
      {!products?.length && (
        <Alert.Root w={"full"} mt={"20"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>No products in the store yet</Alert.Title>
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
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, sm: 1 }}
        flex={1}
        gap={4}
        h={"full"}
        w={"full"}
      >
        {Array.isArray(products) &&
          products?.map((item: Product) => (
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
