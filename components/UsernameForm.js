import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';
import useUserInfo from '../hooks/useUserInfo';

export default function UsernameForm() {
    const {userInfo, status} = useUserInfo();
    const [username, setUserName] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') {
            return;
        }
        if (username === '') {
            const defaultUsername = userInfo?.email?.split('@')[0];
            setUserName(defaultUsername.replace(/[^a-z]+/gi, ''));
        }
    }, [status]);

    async function handleFormSubmit(e) {
        e.preventDefault();
        await fetch('/api/users', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({username}),
        });
        router.reload();
    }

    if (status === 'loading') {
        return '';
    }
    return (
        <div className="flex h-screen items-center justify-center">
            <form className="text-center" onSubmit={handleFormSubmit}>
                <h1 className="text-xl">Pick a username</h1>
                <input className="block mb-1 bg-twitterBorder px-3 py-1 rounded-full" type="text" placeholder={'username'} value={username} onChange={e => {setUserName(e.target.value)}} />
                <button className="block bg-twitterBlue w-full rounded-full py-1">Continue</button>
            </form>
        </div>
    );
}