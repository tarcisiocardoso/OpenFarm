import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from '../constants';

const request = (options) => {
  const headers = new Headers({
      'Content-Type': 'application/json',
  })
  
  if(localStorage.getItem(ACCESS_TOKEN)) {
      headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options);
};


function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  async function fetchUrl() {
    
    return request({
      url: url, 
      method: 'GET'
    }).then(response => {
      if( response.status === 401){
        return {
          erro: true,
          msg: 'Unauthorized',
          httpErro: response.status
        }
      }
      return response.json();
    })
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(error => {
      setData({error, erro: true} );
      setLoading(false);
      } );
  }


  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}

export { useFetch };
