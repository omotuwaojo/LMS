import React from 'react'

function LoginForm() {
  return (
    <form  className="space-y-4 max-w-md mx-auto p-4">
      <input name="email" type="email" placeholder="Email" required className="input" />
      <input name="password"  type="password" placeholder="Password" required className="input" />
      <button type="submit" className="btn">Login</button>
    </form>
  )
}

export default LoginForm