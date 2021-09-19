/**
 * debounce:
 * Configura para que se actualice la base de datos cuando el usuario
 * pare de escribir y no cada vez que escriba una letra.
 * removeHTMLTags:
 * Elimina los tags de HTML para el preview de las notas de la parte de la izquierda, ya que el texto
 * guardado por medio de react-quill se guarda como HTML
 */

export default function debounce(a, b, c) {
  var d, e
  return function () {
    function h() {
      d = null
      c || (e = a.apply(f, g))
    }
    var f = this,
      g = arguments
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    )
  }
}

export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>?/gm, '')
}
