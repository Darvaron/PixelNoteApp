import React from 'react'
import ReactQuill from 'react-quill'
import debounce from '../helpers'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// Componente editor del aplicativo

class EditorComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      title: '',
      id: '',
    }
  }

  render() {
    const { classes } = this.props

    // value -- texto al cargar el editor

    return (
      <div className={classes.editorContainer}>
        <ReactQuill
          value={this.state.text}
          onChange={this.updateBody}
        ></ReactQuill>
      </div>
    )
  }

  updateBody = async(val) => { // Función asincrona que actualiza el estado
      await this.setState({ text: val })
      this.update()
  }

  update = debounce(() => { // Espera a que el usuario pare 1.5 segundos y en dado caso guarda en la base de datos
    console.log('ACTUALIZANDO LA BASE DE DATOS')
    // Actualiza
  }, 1500)

}

export default withStyles(styles)(EditorComponent) // Exporta el componente con estilos
