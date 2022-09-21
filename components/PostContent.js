import React from 'react'
import Avatar from './Avatar'
import ReactTimeAgo from 'react-time-ago';
import Link from 'next/link';

const PostContent = ({text, author, createdAt, _id}) => {
  return (
    <div className="flex">
        <div>
            {!!author?.image && (
                <Avatar src={author.image} /> 
            )}
        </div>
        <div className="pl-2">
            <div>
                <span className="font-bold">{author.name}</span>
                <span className="pl-1 text-twitterLightGray">@{author.username}</span>
                {createdAt && (
                    <span className="pl-1 text-twitterLightGray"><ReactTimeAgo date={createdAt} timeStyle={'twitter'} /></span>
                )}
            </div>
            <Link href={`/${author.username}/status/${_id}`}>
                {text}
            </Link>
        </div>
    </div>
  )
}

export default PostContent