import { useEffect, useState } from 'react';
import { getCotizacion } from '../helpers/getCotizacion';


export const useFetchCotizacion = (id) => {
    const [state, setState] = useState()

    useEffect(() => {
        getCotizacion(id)
            .then(setState);
    }, [id])
    // console.log('Hook', state);
  return state
}

// {
//     data: []
// }