import { Box, Center, Link, Text } from "@chakra-ui/react";

const ContactPage = () => {
  return (
    <Center>
      <Box p={"12"}>
        <Text fontSize={"1xl"}>
          Write to me at{" "}
          <Link
            href="mailto:ganeshpaul999@gmail.com"
            textDecoration={"underline"}
          >
            {" "}
            ganeshpaul999@gmail.com
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default ContactPage;
