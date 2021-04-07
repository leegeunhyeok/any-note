import { useState } from 'react';
import {
  Box,
  Flex,
  Container,
  IconButton,
  Input,
  Textarea,
} from '@chakra-ui/react';
import {
  CloseIcon,
  CheckIcon,
  AttachmentIcon,
  RepeatIcon,
} from '@chakra-ui/icons';

function Editor() {
  const [title, setTitle] = useState('');

  // Handler for input/textarea
  const handleOnChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <Box w="100%" h="100%" bg="white">
      <Container w="100%" h="100%" p="5">
        <Flex h="100%" direction="column">
          <Flex justify="space-between">
            <IconButton
              bg="white"
              color="gray.400"
              mr="5"
              aria-label="Exit"
              icon={<CloseIcon />}
            />
            <IconButton
              bg="white"
              color="blue.400"
              aria-label="Save"
              icon={<CheckIcon />}
            />
          </Flex>
          <Box pt="4">
            <Input
              bg="white"
              value={title}
              onChange={handleOnChange(setTitle)}
              spellCheck={false}
            />
          </Box>
          <Box pt="1" textAlign="left">
            <IconButton
              size="sm"
              bg="white"
              mr="1"
              color="gray.400"
              aria-label="Add image"
              icon={<AttachmentIcon />}
            />
            <IconButton
              size="sm"
              bg="white"
              color="gray.400"
              aria-label="Change note color"
              icon={<RepeatIcon />}
            />
          </Box>
          <Box pt="1" flex="1">
            <Textarea h="100%" bg="white" resize="none" spellCheck={false} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Editor;
