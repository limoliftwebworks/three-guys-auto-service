export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: number
          author_name: string
          profile_photo_url: string
          rating: number
          relative_time_description: string
          text: string
          time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          author_name: string
          profile_photo_url: string
          rating: number
          relative_time_description: string
          text: string
          time: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          author_name?: string
          profile_photo_url?: string
          rating?: number
          relative_time_description?: string
          text?: string
          time?: number
          created_at?: string
          updated_at?: string
        }
      }
      review_images: {
        Row: {
          id: number
          review_id: number
          image_url: string
          width: number | null
          height: number | null
          image_order: number
          image_type: string
          caption: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          review_id: number
          image_url: string
          width?: number | null
          height?: number | null
          image_order: number
          image_type: string
          caption?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          review_id?: number
          image_url?: string
          width?: number | null
          height?: number | null
          image_order?: number
          image_type?: string
          caption?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 