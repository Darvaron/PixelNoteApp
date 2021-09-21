import React, {useEffect, useState, useRef} from 'react'
import './styles.css'

// Componente para dibujar

// FALTA MODIFICAR EN LOS ESTILOS DEL EDITOR:

/** 
 * 
 *  editorContainer: {
      height: '70%',
      width: '100%',
      boxSizing: 'border-box'
    }
 */

function Canvas() {
  // Referencia al canvas actual
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  // Para determinar si se encuentra dibujando
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    // Redefiniendo densidad de pixeles
    canvas.width = window.innerWidth * 2 // Para pantallas de alta densidad
    canvas.height = window.innerHeight * 2 // Para pantallas de alta densidad
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    // Contexto donde se dibuja
    const context = canvas.getContext('2d')
    context.scale(2, 2) // Para soportar la densidad de pixeles
    context.lineCap = 'round' // Para el final del trazo
    context.strokeStyle = 'black' // Estilo
    context.lineWitdh = 5 // Ancho de la linea
    contextRef.current = context
  }, [])

  const draw = ({nativeEvent}) => { // Dibuja
    if(isDrawing){
        const {offsetX, offsetY} = nativeEvent // Obtiene la posición
        contextRef.current.lineTo(offsetX, offsetY) // Dibuja
        contextRef.current.stroke()
    }
  }

  const endDrawing = () => { // Termina de dibujar
    setIsDrawing(false)
    contextRef.current.closePath()
  }

  const starDrawing = ({nativeEvent}) => { // Inicia el dibujo
    const {offsetX, offsetY} = nativeEvent // Obtiene la posición
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  return (
    <div class="layout">
      <canvas
        onMouseDown={starDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  )
}

export default Canvas // Exporta el componente con estilos
