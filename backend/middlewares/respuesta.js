const respuesta = {

  exito: (res, status, mensaje, datos, links = {}) => {
    res.set('Content-Type', 'application/json');

    return res.status(status).json({
      metadata: {
        status:  status,
        mensaje: mensaje
      },
      data:  datos,
      links: links
    });
  },

  error: (res, status, mensaje, links = {}) => {
    res.set('Content-Type', 'application/json');

    return res.status(status).json({
      metadata: {
        status:  status,
        mensaje: mensaje
      },
      data:  null,
      links: links
    });
  },

  lista: (res, status, mensaje, datos, paginacion, links = {}) => {
    res.set('Content-Type', 'application/json');
    res.set('X-Total-Count', String(paginacion.total));

    return res.status(status).json({
      metadata: {
        status: status,
        mensaje: mensaje,
        total: paginacion.total,
        pagina: paginacion.pagina,
        por_pagina: paginacion.por_pagina,
        total_paginas: paginacion.total_paginas
      },
      data:  datos,
      links: links
    });
  }

};

module.exports = respuesta;