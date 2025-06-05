import { createClient } from '@supabase/supabase-js'
import { fetch } from 'cross-fetch'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

async function uploadReviewImages() {
  try {
    // Get all review images
    const { data: images, error } = await supabase
      .from('review_images')
      .select('*')
      .order('review_id, image_order')

    if (error) throw error

    console.log(`Found ${images.length} images to process`)

    for (const image of images) {
      const fileName = `${image.review_id}_${image.image_order}_${image.image_type}.jpg`
      console.log(`Processing ${fileName}...`)

      try {
        // For now, we'll use a placeholder image since we don't have access to the Google Places photos
        const imageBuffer = await downloadImage('https://picsum.photos/800/600')

        const { error: uploadError } = await supabase.storage
          .from('review-images')
          .upload(fileName, imageBuffer, {
            contentType: 'image/jpeg',
            upsert: true
          })

        if (uploadError) throw uploadError

        console.log(`Successfully uploaded ${fileName}`)
      } catch (err) {
        console.error(`Failed to process ${fileName}:`, err)
      }
    }

    console.log('Image upload complete!')
  } catch (err) {
    console.error('Failed to process images:', err)
  }
}

uploadReviewImages() 