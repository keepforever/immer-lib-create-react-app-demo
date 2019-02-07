import React, { Component } from "react";
import styled from 'styled-components';
import uuid from "uuid";
import {
  Note,
  AppContainer,
  Header,
  FormContainer,
  NotesContainer,
  ColorContainer,
  ColorOption,
  Button
} from './styled';

const colorChoices = ["coral", "cornsilk", "yellowgreen"];


const defaultState = {
  isEditing: false,
  notes: [],
  values: {
    text: "Type your note...",
    color: colorChoices[0]
  }
};

class App extends Component {
  state = defaultState;

  handleSelectColor = color => {

    this.setState(state => ({
      ...state,
      values: {
        ...state.values,
        color
      }
    }));
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value
      }
    }));
  };

  handleTextAreaFocus = () => {
    const { text } = this.state.values;
    if (text !== 'Type your note...') {
      return
    }
    this.setState(state => ({
      values: {
        ...state.values,
        text: '',
      }
    }))
  }

  handleAddNote = () => {
    const {
      notes,
      values: { text, color }
    } = this.state;
    if (text === defaultState.values.text) {
      return;
    }
    const newNotes = [
      ...notes,
      {
        id: uuid(),
        color,
        text,
        isComplete: false
      }
    ];

    this.setState(state => ({
      ...state,
      notes: newNotes,
      values: {
        ...defaultState.values
      }
    }));
  };

  // pass in id of note you want to delete.
  // when filter method returns 'true', that object
  // will not be removed from the newly generated newNotes array.
  handleDeleteNote = id => {
    const newNotes = this.state.notes.filter(n => {
      return id !== n.id;
    });

    this.setState(state => ({
      ...state,
      notes: newNotes,
    }));
  };

  handleBeginEdit = id => {
    // find() returns only one object out of an array
    // where callback returns true.
    const noteToEdit = this.state.notes.find(n => {
      return id === n.id;
    });
    // set form values to match that of the note prior to
    // editing so user can adjust.
    this.setState(state => ({
      ...state,
      isEditing: !state.isEditing,
      values: {
        ...noteToEdit
      }
    }));
  };

  // handleEditSubmit() method uses map() to loop over
  // current 'notes' array in state then, where the id matches,
  // it replaces that note with a new note comprised of the
  // old id, but with new values for text and color.
  // then notes is set to newNotes.
  handleEditSubmit = id => {
    const {
      notes,
      values: { text, color }
    } = this.state;

    const newNotes = notes.map(el => {
      return el.id === id
        ? {
            id,
            text,
            color
          }
        : el;
    });

    this.setState(state => ({
      notes: [...newNotes],
      isEditing: false,
      values: {
        ...defaultState.values
      }
    }));
  };


  render() {
    const {
      isEditing,
      notes,
      values: { text, color, id }
    } = this.state;

    return (
      <AppContainer>
        <Header>
          <h1>Note App</h1>
        </Header>
        <FormContainer>
          <ColorContainer>
            {colorChoices.map(c => {
              const isSelected = c === color;
              return (
                <ColorOption
                  onClick={() => this.handleSelectColor(c)}
                  isSelected={isSelected}
                  color={c}
                  key={c}
                />
              );
            })}
          </ColorContainer>
          <textarea
            style={{fontSize: '20px'}}
            onFocus={()=> this.handleTextAreaFocus()}
            value={text}
            onChange={e => {
              this.onChangeText("text", e.target.value);
            }}
            cols="50"
            rows="10"
          />
          {isEditing ? (
            <Button color="#269f42" onClick={() => this.handleEditSubmit(id)}>
              SaveEdit
            </Button>
          ) : (
            <Button color="#269f42" onClick={() => this.handleAddNote()}>Add Note</Button>
          )}
        </FormContainer>
        <NotesContainer>
          {notes.map((n, index) => {
            return (
          <Note
            {...n}
            onDelete={this.handleDeleteNote}
            onEdit={this.handleBeginEdit}
            key={index}
            />);
          })}
        </NotesContainer>
      </AppContainer>
    );
  }
}

export default App;
