import { useState, useRef } from 'react';
import {
  Flex,
  Container,
  Box,
  Input,
  Textarea,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import { CloseIcon, CheckIcon, AttachmentIcon } from '@chakra-ui/icons';
import { Note, ImageWithPreview } from '../types';
import styled from 'styled-components';
import { toDataURL } from '../utils';
import ImagePreview from './ImagePreview';

interface EditorProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onSave: (note: Note) => void;
}

function Editor({ onClose, onSave }: EditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const file = useRef<HTMLInputElement>(null);

  // Handler for input/textarea
  const handleOnChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
  };

  // Create note data
  const save = () => {
    const date = new Date();
    onSave({
      _id: +date,
      title,
      content,
      images: images.map((img) => img.file),
      date,
    });
  };

  const upload = (files: FileList | null) => {
    if (!files) return;
    const image = files[0];

    toDataURL(image).then((src) =>
      setImages([...images, { file: image, src }]),
    );
  };

  const openFileHandler = () => {
    if (!file.current) return;
    file.current.click();
  };

  const removeImage = (idx: number) => {
    const tempImages = [...images];
    tempImages.splice(idx, 1);
    setImages(tempImages);
  };

  return (
    <Box position="fixed" top="0" left="0" w="100%" h="100%" bg="white">
      <Container w="100%" h="100%" p="5">
        <Flex h="100%" direction="column">
          <Flex justify="space-between">
            <IconButton
              bg="white"
              color="gray.400"
              mr="5"
              aria-label="Exit"
              icon={<CloseIcon />}
              onClick={onClose}
            />
            <IconButton
              bg="white"
              color="blue.400"
              aria-label="Save"
              icon={<CheckIcon />}
              onClick={save}
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
            <ImageFileInput
              type="file"
              ref={file}
              onChange={(e) => upload(e.target.files)}
            />
            <IconButton
              size="sm"
              bg="white"
              mr="1"
              color="gray.400"
              aria-label="Add image"
              icon={<AttachmentIcon />}
              onClick={openFileHandler}
            />
          </Box>
          <Box pt="1" pb="5" flex="1">
            <Textarea
              h="100%"
              bg="white"
              value={content}
              onChange={handleOnChange(setContent)}
              resize="none"
              spellCheck={false}
            />
          </Box>
          <Collapse
            startingHeight="0px"
            endingHeight="12vh"
            in={images.length > 0}
            animateOpacity
          >
            <ImagePreview images={images} onImageClick={removeImage} />
          </Collapse>
        </Flex>
      </Container>
    </Box>
  );
}

export default Editor;

const ImageFileInput = styled.input`
  display: none;
`;
