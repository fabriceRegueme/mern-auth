import {useSelector} from 'react-redux';

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='w-24 h-24 rounded-full self-center cursor-pointer object-cover mb-6' src={currentUser.profilePicture} alt="profile"/>
        <input type='text' id='username' placeholder='Username' className='bg-slate-200 rounded-lg p-3' defaultValue={currentUser.username} />
        <input type='text' id='email' placeholder='E-mail' className='bg-slate-200 rounded-lg p-3' defaultValue={currentUser.email}/>
        <input type='password' id='password' placeholder='Password' className='bg-slate-200 rounded-lg p-3' />
        <button className='mt-5 p-3 text-white bg-slate-700 font-semibold uppercase rounded-lg hover:opacity-95 disabled: opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-2'>
        <span className='text-red-700 cursor-pointer font-semibold'>Delete account</span>
        <span className='text-red-700 cursor-pointer font-semibold'>Sign Out</span>
      </div>
    </div>
  )
}
