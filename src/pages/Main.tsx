import { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
  Container,
  Box,
  Button,
  Slide,
  useDisclosure,
  createStandaloneToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNoteStore, addNote, updateNote, deleteNote, init } from '../hooks/database';
import Editor from '../components/Editor';
import Note from '../components/Note';
import { Note as NoteModel } from '../models';
import { BoxContext } from '../database/context';
import BoxDB from 'bxd';
import { NoteType } from '../models/note';

const toast = createStandaloneToast();
const toastOption = { isClosable: true };

function Main() {
  // Value for reset editor component
  const v = useRef(0);
  const db = useContext(BoxContext);
  const [selectedNote, setNote] = useState<NoteType | null>(null);
  const [hasJob, setJobState] = useState(false);
  const [state, dispatch] = useNoteStore();
  const editor = useDisclosure();

  // Init
  useEffect(() => {
    db.open()
      .then(() => NoteModel.find().get(BoxDB.Order.DESC))
      .then((notes) => dispatch(init(notes)))
      .catch((err) => {
        console.log(err);
        toast({ ...toastOption, title: 'Cannot load notes', status: 'error' });
      });
  }, [db, dispatch]);

  // Reset editor and open
  const onOpen = () => ++v.current && editor.onOpen();

  // Open exist note
  const onClickNote = (note: NoteType) => {
    setNote(note);
    onOpen();
  };

  // Delete exist note
  const onNoteDelete = (noteId: number) => {
    if (hasJob) return;

    NoteModel.delete(noteId)
      .then(() => dispatch(deleteNote(noteId)))
      .catch((err) => {
        console.log(err);
        toast({
          ...toastOption,
          title: `Cannot delete note`,
          status: 'error',
        });
      })
      .finally(onClose);
  };

  // Save or add note (IDBObjectStore.put)
  const onNoteSave = (note: NoteType) => {
    if (hasJob) return;

    const noteData = {
      ...note,
      ...(selectedNote ? { _id: selectedNote._id, date: new Date() } : null),
    };
    setJobState(true);

    NoteModel.put(noteData)
      .then(() => {
        dispatch((selectedNote ? updateNote : addNote)(noteData));
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast({
          ...toastOption,
          title: `Cannot ${selectedNote ? 'update' : 'save'} note`,
          status: 'error',
        });
      })
      .finally(onClose);
  };

  const onClose = () => {
    setNote(null);
    setJobState(false);
    editor.onClose();
  };

  const renderNoteList = () =>
    state.notes.map((note) => (
      <Note
        note={note}
        key={note._id}
        onClick={() => onClickNote(note)}
        onDelete={() => onNoteDelete(note._id || 0)}
      />
    ));

  return (
    <Content>
      <Container>
        <Box w="100%" pt="5" pb="5">
          {renderNoteList()}
        </Box>
      </Container>
      <Box w="100%" position="fixed" bottom="0" left="0" p="5" textAlign="center">
        <Button bgColor="blue.400" color="white" onClick={onOpen}>
          <AddIcon color="white" />
        </Button>
      </Box>
      <Slide in={editor.isOpen}>
        <Editor
          initialNote={selectedNote || void 0}
          onClose={onClose}
          onSave={onNoteSave}
          key={v.current}
        />
      </Slide>
    </Content>
  );
}

export default Main;

const Content = styled.main`
  text-align: center;
  height: 100%;
`;
