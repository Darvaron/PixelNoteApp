import React from 'react'
import './App.css'
import firebase from 'firebase'
import 'firebase/firestore'

import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'
import Canvas from './canvas/canvas'

// Clase principal de React

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      // Variables de estado
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    }
  }

  render() {
    // Página principal de la aplicación
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        ></SidebarComponent>
        {this.state.selectedNote ? ( // Si ha seleccionado una nota
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          ></EditorComponent>
        ) : // Si no ha seleccionada nada no despliega el editor
        null}
        {/*{this.state.selectedNote ? ( // Si ha seleccionado una nota
          <Canvas/>
        ) : null}*/}
      </div>
    )
  }

  // Elimina la nota
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note)
    await this.setState({
      notes: this.state.notes.filter((_note) => _note !== note),
    })
    if (this.state.selectedNoteIndex === noteIndex) {
      // Si esta en la nota que quiere eliminar
      this.setState({
        selectedNoteIndex: null, // Deselecciona la nota actual
        selectedNote: null,
      })
    } else {
      // Si no esta en la nota que quiere eliminar
      if (this.state.notes.length >= 1) {
        // Si tiene una o más notas
        this.state.selectedNoteIndex < noteIndex // Esta en una nota de indice menor al que se eliminó
          ? this.selectNote(
              // Sigue en la misma nota
              this.state.notes[this.state.selectedNoteIndex],
              this.state.selectedNoteIndex,
            ) // Si esta en una nota de indice mayor a la eliminada
          : this.selectNote(
              this.state.notes[this.state.selectedNoteIndex - 1],
              this.state.selectedNoteIndex - 1,
            )
      } else {
        // Si no tiene una o más de una nota
        this.setState({
          selectedNoteIndex: null, // Deselecciona la nota actual
          selectedNote: null,
        })
      }
    }

    // Elimina de la base de datos
    firebase.firestore().collection('notes').doc(note.id).delete()
  }

  // Nueva nota
  newNote = async (title) => {
    const note = {
      title: title,
      body: '',
    }
    const newFromDB = await firebase.firestore().collection('notes').add({
      // Crea un nuevo registro en la base de datos
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Fecha de creación
    })
    const newID = newFromDB.id
    await this.setState({ notes: [...this.state.notes, note] }) // Actualiza el estado con las notas que ya existen más la nueva nota
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === newID)[0],
    ) // Obtiene el nuevo index
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    }) // Selecciona el nuevo index
  }

  // Actualiza en la base de datos
  noteUpdate = (id, note) => {
    firebase.firestore().collection('notes').doc(id).update({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Última vez editado
    })
  }

  // Selecciona la nota
  selectNote = (n, i) => {
    this.setState({
      selectedNoteIndex: i,
      selectedNote: n,
    })
  }

  // Cuando el cargue satisfactoriamente se llama automaticamente
  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes') // Obtiene lo que encuentre en notes
      .onSnapshot((serverUpdate) => {
        // Cada vez que se actualice la base de datos
        const notes = serverUpdate.docs.map((_doc) => {
          // Mapeado
          const data = _doc.data()
          data['id'] = _doc.id
          return data
        })
        //console.log(notes)
        this.setState({ notes: notes })
      })
  }
}

export default App
