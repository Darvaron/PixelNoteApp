import React from 'react'
import './App.css'
import firebase from 'firebase';
import 'firebase/firestore';

import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'

// Clase principal de React

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      // Variables de estado
      selectedNoteIndex: null,
      selectNote: null,
      notes: null,
    }
  }

  render() {
    // Página principal de la aplicación
    return(
      <div className='app-container'>
        <SidebarComponent></SidebarComponent>
        <EditorComponent></EditorComponent>
      </div>
    )
  }

  // Cuando el cargue satisfactoriamente se llama automaticamente
  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes') // Obtiene lo que encuentre en notes
      .onSnapshot(serverUpdate => { // Cada vez que se actualice la base de datos
        const notes = serverUpdate.docs.map(_doc => { // Mapeado
          const data = _doc.data()
          data['id'] = _doc.id
          return data
        })
        console.log(notes)
        this.setState({ notes: notes })
      })
  }
}

export default App
