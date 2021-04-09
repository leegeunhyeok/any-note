import { useEffect, useState } from 'react';
import { Box, Button, Text, Skeleton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ImagePreview from './ImagePreview';
import { ImageWithPreview, Note as NoteType } from '../types';
import { toDataURL } from '../utils';

interface NoteProps {
  note: NoteType;
  onClick: () => void;
  onDelete: () => void;
}

function Note({ note, onClick, onDelete }: NoteProps) {
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const [loaded, setLoadState] = useState(false);

  useEffect(() => {
    if (note.images.length) {
      setLoadState(false);
      // Mapping image files to dataURL format
      Promise.all(
        note.images.reduce(
          (prev, curr) => [...prev, toDataURL(curr)],
          [] as Promise<string>[],
        ),
      ).then((imageSources) => {
        const images = note.images.map((imageFile, idx) => ({
          file: imageFile,
          src: imageSources[idx],
        }));
        setImages(images);
        setLoadState(true);
      });
    } else {
      setImages([]);
    }
  }, [note]);

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
          <Skeleton h="100%" isLoaded={loaded}>
            <ImagePreview images={images} />
          </Skeleton>
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
