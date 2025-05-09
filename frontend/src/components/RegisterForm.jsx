import React from 'react'

function RegisterForm() {
  return (
    <form className="space-y-4 max-w-md mx-auto p-4">
    <input name="name"  placeholder="Name" required className="input" />
    <input name="username" placeholder="Username" required className="input" />
    <input name="email"  type="email" placeholder="Email" required className="input" />
    <input name="password"  type="password" placeholder="Password" required className="input" />
    <button type="submit" className="btn">Register</button>
  </form>
  )
}

export default RegisterForm