import {getProviders, signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Image from "next/image";

export default function LoginPage({providers}) {
    const {data,status} = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return '';
    }
    if (data) {
        router.push('/');
    }
    return (
        <div className="flex items-center justify-center h-screen">
            {Object.values(providers).map(provider => (
                <div key={provider.id}>
                    <button onClick={async() => {await signIn(provider.id)}} className="bg-twitterWhite pl-3 pr-5 py-2 
                    text-black rounded-full flex items-center">
                        <Image src="/google.png" alt="" height="32" width="32" />
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {providers},
    }
}