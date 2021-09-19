import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import { removeHTMLTags } from '../helpers'

// Componente funcional, item de la barra lateral

class SidebarItemComponent extends React.Component{
    render(){

        const {_index, _note, classes, selectedNoteIndex} = this.props // Propiedades enviadas desde sidebar

        return(
            <div key={_index}>
                {/*Creando un nuevo item en la lista*/}
                <ListItem
                    className={classes.listItem}
                    selected={selectedNoteIndex === _index} //Si es seleccionada
                    alignItems="flex-start"
                >
                    <div className={classes.textSection}
                        onClick={() => this.selectNote(_note, _index)}
                    >
                        <ListItemText
                            primary={_note.title}
                            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."} // Muestra un pedazo del texto
                        ></ListItemText>
                    </div>
                    <DeleteIcon
                        onClick={() => this.deleteNote(_note)}
                        className={classes.deleteIcon}
                    ></DeleteIcon>
                </ListItem>
            </div>
        )
    }

    // Invoca a la función selecionar nota de sidebar
    selectNote = (n, i) => {
        this.props.selectNote(n , i)
    }

    // Invoca a la función de eliminar nota de sidebar
    deleteNote = (n) => {
        if(window.confirm(`¿Desea eliminar la nota: ${n.title}?`)){ // Ventana de confirmación
            // Si acepta
            this.props.deleteNote(n)
        } 
    }
}

export default withStyles(styles)(SidebarItemComponent) // Exporta el componente con estilos