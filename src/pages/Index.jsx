import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Box, Image, IconButton, useToast, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaUpload, FaShoppingCart } from "react-icons/fa";

const Index = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleUpload = () => {
    if (title && file) {
      const fileUrl = URL.createObjectURL(file);
      setItems([...items, { title, imageUrl: fileUrl }]);
      setTitle("");
      setFile(null);
      toast({
        title: "Item uploaded.",
        description: "Your item has been uploaded successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error.",
        description: "Please provide both title and file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="3xl" fontWeight="bold">
          Student Furniture Marketplace
        </Text>
        <HStack spacing={2} width="100%">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUpload />} />
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </InputGroup>
          <IconButton aria-label="Upload" icon={<FaUpload />} onClick={handleUpload} />
        </HStack>
        <VStack spacing={4} width="100%">
          {items.map((item, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">
              <Image src={item.imageUrl} alt={item.title} boxSize="200px" objectFit="cover" />
              <Box p={4}>
                <HStack justifyContent="space-between">
                  <Text fontSize="xl" fontWeight="bold">
                    {item.title}
                  </Text>
                  <IconButton aria-label="Add to cart" icon={<FaShoppingCart />} />
                </HStack>
              </Box>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
