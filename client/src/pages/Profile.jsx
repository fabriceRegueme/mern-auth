import {useSelector,useDispatch} from 'react-redux';
import { useRef,useState,useEffect } from 'react';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
//import e from 'express';
import {updateUserStart,updateUserSuccess,updateUserFailure} from '../redux/user/userSlice.js'

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser,error,loading} = useSelector(state => state.user);
  const [image,setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, SetFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  

  const handleChange = (e) => {
    SetFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {method: 'POST', headers:  {'Content-Type': 'application/json'},body: JSON.stringify(formData)});
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        setUpdateSuccess(false);
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
       
    } catch (error) { 
      dispatch(updateUserFailure(error));
      setUpdateSuccess(false);
    }
  }

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async(image) => {
    const storage = getStorage(app);
    const fileName =  new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => SetFormData({...formData, profilePicture: downloadUrl}))
      });
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
        <input type='file' hidden ref={fileRef} accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
        <img 
        src={formData.profilePicture || currentUser.profilePicture}   
        alt="profile" 
        className='w-24 h-24 rounded-full self-center cursor-pointer object-cover mb-6'
        onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? 
          (<span className='text-red-700'>Erreur de téléchargement</span>) 
          : 
          imagePercent > 0 && imagePercent < 100 ?
          (<span className='text-slate-700'>{`Téléchargement en cours ... + ${imagePercent} %`}</span>)
          : imagePercent === 100 ?
          (<span className='text-green-700'>Image chargée</span>) : ('')} 
        </p>
        <input type='text' id='username' placeholder='Username' className='bg-slate-200 rounded-lg p-3' defaultValue={currentUser.username} onChange={handleChange} />
        <input type='text' id='email' placeholder='E-mail' className='bg-slate-200 rounded-lg p-3' defaultValue={currentUser.email} onChange={handleChange} />
        <input type='password' id='password' placeholder='Password' className='bg-slate-200 rounded-lg p-3' onChange={handleChange} />
        <button className='mt-5 p-3 text-white bg-slate-700 font-semibold uppercase rounded-lg hover:opacity-95 disabled: opacity-80'>{loading ? 'Chargement ...' : 'Mis à jour'}</button>
      </form>
      <div className='flex justify-between mt-2'>
        <span className='text-red-700 cursor-pointer font-semibold'>Delete account</span>
        <span className='text-red-700 cursor-pointer font-semibold'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && "Problème rencontré"}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && "Profile mis à jour."}</p>
    </div>
  )
}

/*
firebase storage > rules
 allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
*/