import {
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const handleAddProduct = () => {
    console.log(newProduct);
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({ ...newProduct, name: event.target.value })
              }
            ></Input>
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(event) =>
                setNewProduct({ ...newProduct, price: event.target.value })
              }
            ></Input>
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(event) =>
                setNewProduct({ ...newProduct, image: event.target.value })
              }
            ></Input>
            <Button onClick={handleAddProduct} w={'full'} colorScheme="blue">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
