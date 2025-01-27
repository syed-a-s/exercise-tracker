import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';

function ProtectedRoute({children}) {
  const [isAuthorized, setIsAuthorized] = useState(null)

  // call auth() only during mount
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      // post refresh token to backend to get new access token
      const res = await api.post('/api/token/refresh/', {refresh: refreshToken})

      // if 200 status from backend
      if (res.status === 200) {
        // set new access token in local storage
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        // user is now authorized
        setIsAuthorized(true)
      // otherwise
      } else {
        // user is not authorized
        setIsAuthorized(false)
      }
    } catch (error) {
      console.log(error)
      setIsAuthorized(false)
    }
  }

  // function that will only load the route if the user is authorized
  // otherwise, reroute to the login page
  const auth = async () => {
    // get jwt token from local storage
    const token = localStorage.getItem(ACCESS_TOKEN)

    // if not authorized, return
    if (!token) {
      setIsAuthorized(false)
      return
    }

    // otherwise, decode the jwt token
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp

    // check if token is expired 
    const now = Date.now() / 1000
    if (tokenExpiration < now) {
      await refreshToken()
    // if so, set authorized
    } else {
      setIsAuthorized(true)
    }
  }

  if (isAuthorized == null) {
    return <div>loading...</div>
  }

  return isAuthorized ? children : <Navigate to='/login'/>
}

export default ProtectedRoute;