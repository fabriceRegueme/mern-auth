import {Link} from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);

const handleChange = (e) => {
  e.preventDefault();
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form className='flex flex-col gap-4'>
        <input className='bg-slate-200 p-3 rounded-lg' type='text' placeholder='E-mail' id='email' onChange={handleChange}/>
        <input className='bg-slate-200 p-3 rounded-lg' type='password' placeholder='Password' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:oppacity-95 disabled:opacity-80' type='submit'>
          {loading ? 'Chargement' : 'Se Connecter'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Register?</p>
        <Link to="/sign-up">
          <span className='text-blue-500'>S'enregistrer</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went wrong!"}</p>
    </div>
  );
}



