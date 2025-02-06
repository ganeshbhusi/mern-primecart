import { Product } from "@/types/products";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ProductUpdateModalProps {
  product: Product;
  isVisible: boolean;
  onUpdate: (product: Product) => void;
  onClose: () => void;
}

const ProductUpdateModal = ({
  product,
  isVisible,
  onUpdate,
  onClose,
}: ProductUpdateModalProps) => {
  const [updatingProduct, setUpdatingProduct] = useState<Product>(product);

  useEffect(() => {
    setUpdatingProduct(product);
    return () => {
      setUpdatingProduct({} as Product);
    };
  }, [product]);

  const handleClickUpdate = () => {
    onUpdate(updatingProduct);
  };
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalOverlay blur={true} backdropBlur={true}>
        <ModalContent
          minHeight={"40vh"}
          style={{
            backgroundColor: "coral",
            width: 500,
            padding: 16,
            alignSelf: "center",
            marginTop: 140,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginLeft: "30%",
            borderRadius: 16,
          }}
        >
          <ModalHeader>{updatingProduct?.name}</ModalHeader>

          <ModalBody>
            <Text>Price</Text>
            <Input
              name="price"
              placeholder="Ex. 99"
              type="text"
              value={updatingProduct?.price}
              onChange={(evt) =>
                setUpdatingProduct({
                  ...updatingProduct,
                  price: evt.target.value,
                })
              }
            />
            <Text>Quantity</Text>
            <Input
              name="quantity"
              placeholder="Ex. 99"
              type="text"
              value={updatingProduct?.quantity}
              onChange={(evt) =>
                setUpdatingProduct({
                  ...updatingProduct,
                  quantity: evt.target.value,
                })
              }
            />
          </ModalBody>

          <ModalFooter style={{ marginTop: 16 }}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleClickUpdate}
              variant={"solid"}
              bgColor={"green.600"}
              disabled={
                updatingProduct.quantity === product.quantity &&
                updatingProduct.price === product.price
              }
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ProductUpdateModal;
