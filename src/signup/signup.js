import { Link } from 'react-router-dom'
import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styles from './styles'
import firebase from 'firebase'
import 'firebase/firestore'

//const firebase = require('firebase')

// Componente de registro

class SignupComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: '',
    }
  }
  render() {
    const { classes } = this.props

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Bienvenido a PixelNote
          </Typography>
          <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Ingresa tu email
              </InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                id="signup-email-input"
                onChange={(e) => this.userTyping('email', e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Crea tu contraseña
              </InputLabel>
              <Input
                type="password"
                id="signup-password-input"
                onChange={(e) => this.userTyping('password', e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirma tu contraseña
              </InputLabel>
              <Input
                type="password"
                id="signup-password-confirmation-input"
                onChange={(e) => this.userTyping('passwordConfirmation', e)}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Crea tu cuenta
            </Button>
          </form>
          {this.state.signupError ? ( // Si hay un error
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              {this.state.signupError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            variant="h6"
            className={classes.hasAccountHeader}
          >
            ¿Ya tienes una cuenta?
          </Typography>
          <Link className={classes.logInLink} to="/login">
            Ingresa con tu cuenta
          </Link>
        </Paper>
      </main>
    )
  }

  // Validación del formulario
  formIsValid = () => this.state.password === this.state.passwordConfirmation

  // Guarda lo que el usuario este escribiendo
  userTyping = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value })
        break
      case 'password':
        this.setState({ password: e.target.value })
        break

      case 'passwordConfirmation':
        this.setState({ passwordConfirmation: e.target.value })
        break

      default:
        break
    }
  }

  // Sube el registro
  submitSignup = (e) => {
    e.preventDefault() // Previene que se refresque la página automaticamente
    if (!this.formIsValid()) {
      // Si las contraseñas no coinciden
      this.setState({ signupError: 'Las contraseñas no coinciden' })
      return
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password) // Crea un usuario en la autenticación
      .then(
        authRes => {
          // Cuando recibe la respuesta del servidor
          const userObject = {
            email: authRes.user.email,
          }
          // Lo añade a la base de datos
          firebase.firestore()
            .collection('users')
            .doc(this.state.email)
            .set(userObject)
            .then(
              () => {
                // Propiedad pasada desde el router
                this.props.history.push('/misnotas')
              },
              (dbError) => {
                console.log('ERROR: ', dbError)
                this.setState({ signupError: 'No se pudo añadir el usuario' })
              },
            )
        },
        (authErr) => {
          console.log('ERROR: ', authErr)
          this.setState({ signupError: 'No se pudo añadir el usuario' })
        },
      )
  }
}

export default withStyles(styles)(SignupComponent)
