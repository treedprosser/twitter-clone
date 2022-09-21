import useUserInfo from '../hooks/useUserInfo';
import UsernameForm from "../components/UsernameForm";
import PostForm from '../components/PostForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostContent from '../components/PostContent';
import Layout from '../components/Layout';

export default function Home() {
  const {userInfo, status: userInfoStatus} = useUserInfo();

  const [posts, setPosts] = useState([]);

  function fetchHomePosts() {
    const posts = axios.get('/api/posts').then(response => {
      setPosts(response.data)
    });
  }

  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (userInfoStatus === 'loading') {
    return 'loading user info';
  }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <Layout>
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm onPost={() => {fetchHomePosts();}} />
      <div>
        {posts.length > 0 && posts.map(post => (
          <div key={post._id} className="border-t border-twitterBorder p-5">
            <PostContent {...post} />
          </div>
        ))}
      </div>
    </Layout>
  );
}