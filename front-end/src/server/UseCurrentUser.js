import { useState, useEffect } from "react";
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options);
};

function useCurrentUser() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    // if (!localStorage.getItem(ACCESS_TOKEN)) {
    //     setData({ error: 'Sem accesstoken' });
    //     setLoading(false);
    // } else {
    
    useEffect(() => {
        // console.log('>>>useEffect do useCurrentUser<<<');
        async function fetchUrl() {

            if (!localStorage.getItem(ACCESS_TOKEN)) {
                setData(null);
                setLoading(false);
            } else {
                const profile = localStorage.getItem(ACCESS_TOKEN+"_PROFILE");
                if( !profile || profile.length === 0 ){
                    console.log(">>>NÃO pegando do logalstorage<<<");
                    return request({
                        url: API_BASE_URL + "/user/me",
                        method: 'GET'
                    }).then(response => {
                        console.log(response.status);
                        if (response.status === 401) {
                            return {
                                erro: true,
                                msg: 'Unauthorized',
                                httpErro: response.status
                            }
                        }
                        return response.json();
                    }).then(data => {
                        setData(data);
                        setLoading(false);
                        localStorage.setItem(ACCESS_TOKEN+"_PROFILE", JSON.stringify(data) );
                    }).catch(error => {
                        setData({ error, erro: true });
                        setLoading(false);
                    });
                }else{
                    return new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        setData(JSON.parse(profile));
                        setLoading(false);
                    })
                }
            }
        }
        fetchUrl();
    }, []);
    // }

    return [data, loading];

}

export { useCurrentUser };
