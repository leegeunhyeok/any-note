import { useRef } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

interface ImagePreviewProps {
  images: string[];
  onImageClick?: (index: number) => void;
}

function ImagePreview({ images, onImageClick }: ImagePreviewProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);
  const imageList = images.map((image, i) => (
    <CSSTransition
      nodeRef={nodeRef}
      key={image}
      timeout={200}
      classNames="move"
    >
      <ScaleBox
        h="100%"
        mr="2"
        display="inline-block"
        borderStyle="solid"
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.200"
        ref={nodeRef}
        onClick={() => onImageClick && onImageClick(i)}
      >
        <Image h="100%" src={image} />
      </ScaleBox>
    </CSSTransition>
  ));

  return (
    <Box
      height="100%"
      textAlign="left"
      overflowY="hidden"
      overflowX="auto"
      whiteSpace="nowrap"
      ref={wrap}
    >
      <FitTransitionGroup>{imageList}</FitTransitionGroup>
    </Box>
  );
}

export default ImagePreview;

const FitTransitionGroup = styled(TransitionGroup)`
  height: 100%;

  & * {
    height: 100%;
  }
`;

const ScaleBox = styled(Box)`
  overflow: hidden;
  cursor: pointer;
`;
