

import fs from 'fs'
import path from 'path'

import NextImage from 'next/image'

const sizeOf = require('image-size')


import Head from 'next/head'


// 04 My Styles
import styles from '../components/global/xNextImage.module.scss'





export default function Home( {photos} ) {
  return (
    <>
      <Head>
        <title>Nancy Webb</title>
      </Head>
{/* 
      <h1>Nancy Webb LOL</h1> */}

      <main className={`   `}>
      <div className={`wrapper`}> 
      <div className={`  letterbox_64_128 `}>
      
      
          <div className={`textAlignCenter`}>


          
              {photos.map((i, index) => (
                <div className={`${styles.nextImageDiv} ${styles.BorderMargin_6} `}>
                  <NextImage
                    src={`/photos/${i.photo_filename}`}  
                    width={i.dimensions.width}
                    height={i.dimensions.height}
                    key={index}
                  />
                  {/* <figcaption>Yolo</figcaption> */}
                </div>


              ))}
          
          </div>
          
      
      </div>
      </div>
      </main>
    </>

  )
}




export const getStaticProps = async () => {

  const root = process.cwd()
  const filepath = path.join(root, 'public/photos')
  const files = fs.readdirSync(filepath)

  const filter_files = files.filter(i => i.match(/^\_/g) === null )


  const photos =  filter_files.reverse().map(i => {

    const root = process.cwd()
    const filepath = path.join(root, 'public/photos', i)
    const dimensions = sizeOf(filepath)

    const MAX_WIDTH = 960
    const MAX_HEIGHT = 760

    let ratio

    if (dimensions.width > MAX_WIDTH) {
        ratio = dimensions.height / dimensions.width
        dimensions.width = MAX_WIDTH
        dimensions.height = dimensions.width * ratio
    }
    if (dimensions.height > MAX_HEIGHT) {
        ratio = dimensions.width / dimensions.height
        dimensions.height = MAX_HEIGHT
        dimensions.width = dimensions.height * ratio
    }


    return {
        photo_filename: i,
        dimensions,
    }



  })


  return {
      props: {
          photos,
      }
  }
}