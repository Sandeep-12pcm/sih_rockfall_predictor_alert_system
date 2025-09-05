import React from 'react'
const page = () => {
  return (
    <>
      <form action={signup}>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default page