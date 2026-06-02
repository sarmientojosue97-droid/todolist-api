
function Paginacion({ metadata, onCambiarPagina }) {

    if (!metadata || metadata.total_paginas <= 1) return null;

    const { pagina, total_paginas, total, por_pagina } = metadata;
    const inicio = (pagina - 1) * por_pagina + 1;
    const fin    = Math.min(pagina * por_pagina, total);

    return (
        <div className="paginacion">
            <span>Mostrando {inicio}–{fin} de {total} tareas</span>

            <div className="paginacion-botones">
                
                <button className="btn btn-sm" onClick={() => onCambiarPagina(pagina - 1)} disabled={pagina <= 1}>
                    Anterior
                </button>

                <span style={{ padding: '0 0.5rem' }}>{pagina} / {total_paginas}</span>

                <button className="btn btn-sm" onClick={() => onCambiarPagina(pagina + 1)} disabled={pagina >= total_paginas}>
                    Siguiente
                </button>
                
            </div>
        </div>
    );
}

export default Paginacion;