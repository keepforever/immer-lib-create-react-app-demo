import React, { Component } from "react";
import produce from "immer";
import { v4 as uuid } from "uuid";
import "./App.css";
import Crud from './comps/Crud'

export default class App extends Component {
  nameRef = React.createRef();

  state = {
    selectedOption: "option1",
    hasBike: false,
    hasSpine: true,
    details: { eventName: "Birthday Party" },
    people: [
      { uuid: uuid(), name: "Leigh", attending: true },
      { uuid: uuid(), name: "Pedro", attending: false },
      { uuid: uuid(), name: "Dorothy", attending: false },
      { uuid: uuid(), name: "Grandma", attending: true }
    ]
  };

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  setEventName = value => {
    // const { details } = this.state;
    // this.setState({
    //   details: { ...details, eventName: value }
    // });

    this.setState(
      produce(draft => {
        draft.details.eventName = value;
      })
    );
  };

  updateAttending = (uuid, newAttending) => {
    // const { people } = this.state;
    // const newPeople = people.map(person => {
    //   if (person.uuid === uuid) {
    //     return { ...person, attending: newAttending };
    //   }
    //   return person;
    // });
    // this.setState({
    //   people: newPeople
    // });

    this.setState(
      produce(draft => {
        draft.people.forEach(person => {
          if (person.uuid === uuid) {
            person.attending = newAttending;
          }
        });
      })
    );
  };

  addPerson = name => {
    // const { people } = this.state;
    // this.setState({
    //   people: [...people, { uuid: uuid(), attending: false, name }]
    // });

    this.setState(
      produce(draft => {
        draft.people.push({ uuid: uuid(), attending: false, name });
      })
    );
  };

  // removePerson = uuid => {
  //   const { people } = this.state;
  //   const newPeople = people.filter(person => person.uuid !== uuid);
  //   this.setState({
  //     people: newPeople
  //   });
  // };

  removePerson = uuid => {
  this.setState(produce(draft => {
    draft.people.pop(person => person.uuid !== uuid);
  }));
};

  toggleHasBike = name => event => {
    console.log('\n', 'event.target.checked', '\n', '\n', event.target.checked )
    this.setState({
      ...this.state,
      [name]: event.target.checked,
    })
  };

  toggleHasSpine = event => {
    console.log('\n', 'event.target.name', '\n', '\n', event.target.name )
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
    })
  };

  render() {
    const { details, people, hasBike, hasSpine } = this.state;

    console.log('\n', 'hasBike', '\n', hasBike, '\n', 'hasSpine', '\n', hasSpine, '\n',  )

    console.log('\n', 'this.state', '\n', '\n', this.state )

    return (
      <div className="App">
        <input
          onChange={e => {
            const value = e.target.value;
            this.setEventName(value);
          }}
          value={details.eventName}
        />
        <ul>
          {people.map(person => (
            <li key={person.uuid}>
              {person.name} - {person.attending ? "Going" : "Not Going"}
              <button
                style={{margin: 10}}
                onClick={e => {
                  e.preventDefault();
                  this.updateAttending(person.uuid, !person.attending);
                }}
              >
                {person.attending ? "Not Going" : "Going"}
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  this.removePerson(person.uuid);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (this.nameRef.current.value) {
              this.addPerson(this.nameRef.current.value);
              e.target.reset();
            }
          }}
        >
          <input ref={this.nameRef} placeholder="Attendee's name" required />
          <button>Add</button>
        </form>
        <br/> <hr/> <hr/> <hr/>  <br/>
        <h1>
          CRUD
        </h1>
        <Crud />
        <br/> <hr/> <hr/> <hr/>  <br/>
        <h1>
          Checkbox
        </h1>
        <input
          onChange={this.toggleHasSpine}
          type="checkbox"
          name="hasSpine"
          checked={hasSpine}
        />
        <span style={{marginLeft: 20}}>
          I have a spine
        </span>

        <br/>

        <input
          onChange={this.toggleHasBike("hasBike")}
          type="checkbox"
          checked={hasBike}
        />
        <span style={{marginLeft: 20}}>
          I have a bike
        </span>
        <br />

        <h1>Radio</h1>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="option1"
              checked={this.state.selectedOption === "option1"}
              className="form-check-input"
              onChange={this.handleOptionChange}
            />
            Option 1
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="option2"
              checked={this.state.selectedOption === "option2"}
              className="form-check-input"
              onChange={this.handleOptionChange}
            />
            Option 2
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="option3"
              checked={this.state.selectedOption === "option3"}
              className="form-check-input"
              onChange={this.handleOptionChange}
            />
            Option 3
          </label>
        </div>
      </div>
    );
  }
}
