import { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ImagePreview from './ImagePreview';
import { Note as NoteType } from '../types';

interface NoteProps {
  note: NoteType;
  onClick: () => void;
  onDelete: () => void;
}

function Note({ note, onClick, onDelete }: NoteProps) {
  const [images] = useState<string[]>(note.images);

  const deleteNote = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <NoteBox
      w="100%"
      p="5"
      mb="5"
      borderWidth="1px"
      borderRadius="lg"
      textAlign="left"
      key={note._id}
      onClick={onClick}
    >
      <Box>
        <Text fontSize="md">
          {note.title}
          <Button
            size="xs"
            w="4"
            h="4"
            borderRadius="full"
            float="right"
            bgColor="white"
            color="red.200"
            onClick={deleteNote}
          >
            <CloseIcon />
          </Button>
        </Text>
      </Box>
      <Box>
        <Text fontSize="xs" color="gray.400">
          {dayjs(note.date).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
      </Box>
      {images.length ? (
        <Box h="10vh" mt="2">
          <ImagePreview images={images} />
        </Box>
      ) : null}
    </NoteBox>
  );
}

export default Note;

const NoteBox = styled(Box)`
  transition: transform 0.3s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;
