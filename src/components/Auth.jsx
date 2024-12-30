import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import useUserStore from '../store/useUserStore';

export const LoginButton = () => {
    const { setUser } = useUserStore();

    return (
        <GoogleLogin
            className='h-12'
            onSuccess={(credentialResponse) => {
                const token = credentialResponse.credential;
                const user = jwtDecode(token);
                setUser(user, token);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
};

export const Profile = () => {
    const { user, clearUser } = useUserStore();

    return (
        <div className='flex items-center gap-4'>
            <div className='flex flex-col items-end text-sm'>
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
            <img src={user.picture} alt={user.name} className='size-10 hover:scale-105 hover:-rotate-3' />
            <button
                className='bg-rose-400 flex p-2 items-center justify-center size-10 text-black hover:scale-105 hover:-rotate-3'
                onClick={() => {
                    clearUser();
                    googleLogout();
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
            </button>
        </div>
    )
}
