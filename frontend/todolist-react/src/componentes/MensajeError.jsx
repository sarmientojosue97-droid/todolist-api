function MensajeError({mensaje,onReintentar}){
    return(
        <div className="mensaje-error">
            {mensaje}
            {onReintentar && (
                <button onClick={onReintentar} style={{marginLeft:'1rem', cursor:'pointer', background:'none'}}>
                    Reintentar
                </button>
            )}
        </div>
    );
}
export default MensajeError;

// aun faltando estilos del ".md" A , tengo que revisar