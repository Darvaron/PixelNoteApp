import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'
import ListItem from '@material-ui/core/ListItem'
import { removeHTMLTags } from '../helpers'

class SidebarItemComponent extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(<div>SidebarItem</div>)
    }

}

export default withStyles(styles)(SidebarItemComponent) // Exporta el componente con estilos