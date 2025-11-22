import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import { useState } from 'react';
const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const background = useColorModeValue('white', 'gray.800');

  const { updateProduct, deleteProduct } = useProductStore();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toast({
        title: 'Error',
        status: 'error',
        isClosable: true,
        description: message,
        duration: 3000,
      });
    } else {
      toast({
        title: 'Success',
        status: 'success',
        isClosable: true,
        description: message,
        duration: 3000,
      });
    }
    onClose();
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toast({
        title: 'Error',
        status: 'error',
        isClosable: true,
        description: message,
        duration: 3000,
      });
    } else {
      toast({
        title: 'Success',
        status: 'success',
        isClosable: true,
        description: message,
        duration: 3000,
      });
    }
  };
  return (
    <Box
      shadow={'lg'}
      rounded={'2xl'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bgColor={background}
    >
      <Image
        src={product.image}
        alt={product.name}
        height={48}
        width={'full'}
        objectFit={'cover'}
      />
      <Box padding={4}>
        <Heading as={'h3'} size={'md'} marginBottom={2}>
          {product.name}
        </Heading>
        <Text
          fontWeight={'bold'}
          fontSize={'xl'}
          color={textColor}
          marginBottom={4}
        >
          ${product.price}
        </Text>
        <HStack>
          <IconButton
            icon={<EditIcon />}
            colorScheme={'blue'}
            onClick={onOpen}
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme={'red'}
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(event) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: event.target.value,
                  })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={(event) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: event.target.value,
                  })
                }
              />
              <Input
                placeholder="Image"
                name="image"
                value={updatedProduct.image}
                onChange={(event) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: event.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              marginRight={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant={'ghost'} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
