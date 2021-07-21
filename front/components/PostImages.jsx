import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'
import ImageZoom from './imagesZoom'
const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false)
  const onClose = useCallback(() => {
    setShowImagesZoom(false)
  }, [])
  const onZoom = useCallback(() => {
    setShowImagesZoom(true)
  }, [])
  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    )
  }
  if (images.length === 2) {
    return (
      <>
        <img
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    )
  }
  return (
    <>
      <div>
        <img
          width="50%"
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />

        <div
          role="presentation"
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
    </>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
}
export default PostImages
