import styled from 'styled-components';
import Editor from '../components/Editor';

function Main() {
  return (
    <Content>
      <Editor />
    </Content>
  );
}

export default Main;

const Content = styled.main`
  text-align: center;
  height: 100%;
`;
