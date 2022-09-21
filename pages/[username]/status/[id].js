import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import PostContent from '../../../components/PostContent';

const PostPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [post, setPost] = useState();

    useEffect(() => {
        if (!id) return;
        axios.get('/api/posts?id=' + id)
            .then(response => {
                setPost(response.data.post);
            });
    }, [id]);

    return (
        <Layout>
            {!!post?.id && (
                <div className="p-5">
                    <Link href={'/'}>Tweet</Link>
                    <PostContent {...post} />
                </div>
            )}
        </Layout>
  )
}

export default PostPage