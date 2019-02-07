import React from "react";
import styled from "styled-components";

// STYLED COMPONENTS FOR NOTE //

const Container = styled.div`
  min-height: 10vh;
  min-width: 40vh;
  width: 40vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 5vh;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: stretch;
  flex-direction: row;
`;

const Note = ({ id, color, text, onEdit, onDelete }) => {
  return (
    <Container style={{ backgroundColor: `${color}` }}>
      <p style={{ fontSize: "19px", color: "white" }}>{text}</p>
      <ButtonContainer>
        <Button color="lightgrey" onClick={() => onEdit(id)}>
          Edit
        </Button>
        <Button color="red" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </ButtonContainer>
    </Container>
  );
};

// STYLED COMPONENTS FOR APP //
const AppContainer = styled.div`
  margin-right: 0;
  align-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-width: 50vw;
  max-width: 50vw;
`;

const Header = styled.div`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

const NotesContainer = styled.div`
  margin-top: 5vh;
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: row;
`;

const ColorOption = styled.div`
  background-color: ${props => props.color};
  display: flex;
  border: ${props => (props.isSelected ? `yellow solid 3px` : null)}
  width: 100%;
  flex: 1;
  height: 7vh;
`;

const Button = styled.button`
  flex: 1;
  height: 10vh;
  background-color: ${props => props.color};
  width: 100%;
  border: 1px solid rgba(27, 31, 35, 0.5);
  border-radius: 0.25em;
  color: black;
  cursor: pointer;
  font-size: 19px;
`;

export {
  Note,
  AppContainer,
  Header,
  FormContainer,
  NotesContainer,
  ColorContainer,
  ColorOption,
  Button
};
