import styled from 'styled-components';
import Editor from '../components/Editor';
import { Button, Slide, useDisclosure } from '@chakra-ui/react';
import { Note } from '../types';

function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const save = (note: Note) => {
    console.log(note);
    onClose();
  };

  return (
    <Content>
      <Button onClick={onOpen}>Open</Button>
      <Slide in={isOpen}>
        <Editor onClose={onClose} onSave={save} />
      </Slide>
    </Content>
  );
}

export default Main;

const Content = styled.main`
  text-align: center;
  height: 100%;
`;
