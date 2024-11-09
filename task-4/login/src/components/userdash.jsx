import React from 'react'
import { useCookies } from 'react-cookie';


export function UserDash() {
  const [cookies] = useCookies(['userid']);

  return (
      <div>
          <h2>Welcome to {cookies.userid}</h2>
      </div>
  )
}


