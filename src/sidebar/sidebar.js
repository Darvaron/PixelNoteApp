import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Redirect } from "react-router-dom"
import styles from './styles'
import List from '@material-ui/core/List'
import { Divider, Button } from '@material-ui/core'
import SidebarItemComponent from '../sidebarItem/sidebarItem'
import firebase from 'firebase'
import 'firebase/firestore'

// Barra lateral del proyecto

class SidebarComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      addingNote: false,
      title: null,
    }
  }

  render() {
    // Enviados a través de App.js
    const { notes, classes, selectedNoteIndex } = this.props

    // Lidiando con el asicronismo, si existen las notas
    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          {/*Añade una nueva nota*/}
          <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
            {this.state.addingNote ? 'Cancelar' : 'Nueva nota'}
          </Button>
          {
            // Si esta añadiendo una nueva nota
            this.state.addingNote ? (
              <div>
                <input
                  type="text"
                  className={classes.newNoteInput}
                  placeholder="Título"
                  onKeyUp={(e) => this.updateTitle(e.target.value)} // Cuando comience a escribir y suelte una tecla
                ></input>
                <Button
                  className={classes.newNoteSubmitBtn}
                  onClick={this.newNote}
                >
                  Crear nota
                </Button>
              </div>
            ) : // Si no esta añadiendo una nota entonces no hace nada
            null
          }
          <List>
            {
              // Mapeado de las notas a una lista de notas
              notes.map((_note, _index) => {
                return (
                  <div key={_index}>
                    <SidebarItemComponent
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}
                    ></SidebarItemComponent>
                    <Divider></Divider> {/*Linea divisora entre items*/}
                  </div>
                )
              })
            }
          </List>
          <Button onClick={this.signOut} className={classes.signOutBtn}>Cerrar sesión</Button>
        </div>
      )
    } else {
      // No genera nada mientras carga las notas
      return <div></div>
    }
  }

  // Acción a realizar el botón de cerrar sesión
  signOut = () => {
    firebase.auth().signOut()
    this.props.signOut()
  }

  // Actualiza el título del texto
  updateTitle = (txt) => {
    this.setState({ title: txt })
  }

  // Al presionar el botón de nueva nota
  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote })
  }

  // Invoca la creación de la nota de App
  newNote = () => {
    this.props.newNote(this.state.title)
    this.setState({title: null, addingNote: false})
  }

  // Invoca la selección de App
  selectNote = (note, index) => {
    this.props.selectNote(note, index)
  }

  // Invoca la eliminación de App
  deleteNote = (note) => {
    this.props.deleteNote(note)
  }
}

export default withStyles(styles)(SidebarComponent) // Exporta el componente con estilos
