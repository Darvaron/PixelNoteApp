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

  componentDidUpdate = () => {
    // Cuando se actualiza el componente
    if (this.props.selectedNote.id !== this.state.id) {
      // Si seleccionó otra nota
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id,
      })
    }
  }

  componentDidMount = () => {
    // Cuando se monta el componente
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id,
    })
  }

  render() {
    // classes -- estilos
    const { classes } = this.props

    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
          className={classes.titleInput}
          placeholder="Título de la nota..."
          value={this.state.title ? this.state.title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}
        ></input>
        {/*value -- texto al cargar el editor
          onChange -- acción a realizar cuando se actualiza el editor
        */}
        <ReactQuill
          value={this.state.text} // Texto desplegado en el editor
          onChange={this.updateBody}
          modules={this.modules}
          formats={this.formats}
        ></ReactQuill>
      </div>
    )
  }

  // Modulo de ReactQuill
  modules = {
    toolbar: [
      [{ header: [1, 2, false] }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ]
  // Actualiza el título
  updateTitle = async (val) => {
    await this.setState({ title: val })
    this.update()
  }

  updateBody = async (val) => {
    // Función asincrona que actualiza el estado
    await this.setState({ text: val })
    this.update()
  }

  update = debounce(() => {
    // Espera a que el usuario pare 1.5 segundos y en dado caso actualza la base de datos
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
    })
  }, 1500)
}

export default withStyles(styles)(EditorComponent) // Exporta el componente con estilos
