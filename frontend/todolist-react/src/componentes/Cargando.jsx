function Cargando({mensaje='Cargando - - - -'}){
    return (
        <div className="cargando">
            <div className="spinner"></div>
            <p>{mensaje}</p>
        </div>
    );
}
export default Cargando;