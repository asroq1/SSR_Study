import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map(data => {
        if (data.match(/(#[^\s]+)/)) {
          return (
            <Link href={`/hashtag/${data.slice(1)}`} key={data}>
              <a>{data}</a>
            </Link>
          )
        }
        return data
      })}
    </div>
  )
}

PostCardContent.propTypes = { postData: PropTypes.string.isRequired }
export default PostCardContent
