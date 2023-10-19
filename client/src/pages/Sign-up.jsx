import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4  '>
        <input className='bg-slate-200 p-3 rounded-lg' type='text' placeholder='Username' id='username'/>
        <input className='bg-slate-200 p-3 rounded-lg' type='text' placeholder='Email' id='email'/>
        <input className='bg-slate-200 p-3 rounded-lg' type='text' placeholder='Password' id='password'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:oppacity-95 disabled:opacity-80' type='submit'>SIGN UP</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}
