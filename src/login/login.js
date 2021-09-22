import { Link } from 'react-router-dom'
import React from 'react'
import styles from './styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import firebase from 'firebase'
import 'firebase/firestore'

class LoginComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      email: null,
      password: null,
      loginError: '',
    }
  }

  render() {
    const { classes } = this.props

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Inicia sesión en PixelNote
          </Typography>
          <form className={classes.form} onSubmit={(e) => this.submitLogin(e)}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-email-input">
                Ingresa tu email
              </InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                id="login-email-input"
                onChange={(e) => this.userTyping('email', e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-password-input">
                Ingresa tu contraseña
              </InputLabel>
              <Input
                type="password"
                id="login-password-input"
                onChange={(e) => this.userTyping('password', e)}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar sesión
            </Button>
          </form>
          {this.state.loginError ? ( // Si hay un error al iniciar sesión
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              Usuario o contraseña incorrectos
            </Typography>
          ) : null}
          <Typography
            component="h5"
            variant="h6"
            className={classes.noAccountHeader}
          >
            ¿No tienes cuenta?
          </Typography>
          <Link className={classes.signUpLink} to="/signup">
            Registrarse
          </Link>
        </Paper>
      </main>
    )
  }
  // Actualiza los atributos cuando escribe
  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value })
        break
      case 'password':
        this.setState({ password: e.target.value })
        break

      default:
        break
    }
  }

  // Envia el formulario
  submitLogin = (e) => {
    e.preventDefault()
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
        this.props.history.push('/misnotas') // Si inicia sesión satisfactoriamente
    }, error => {
        this.setState({loginError: "Error en el servidor"})
        console.log(error)
    })
  }
}

export default withStyles(styles)(LoginComponent)
