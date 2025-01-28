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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          skills: string[] | null
          experience: string | null
          created_at: string
          role: 'user' | 'admin'
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          skills?: string[] | null
          experience?: string | null
          created_at?: string
          role?: 'user' | 'admin'
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          skills?: string[] | null
          experience?: string | null
          created_at?: string
          role?: 'user' | 'admin'
        }
      }
      casting_calls: {
        Row: {
          id: string
          title: string
          role: string
          type: string
          description: string
          requirements: string | null
          deadline: string
          location: string
          roles_available: number
          compensation: string | null
          production_house: string | null
          contact_info: string
          image_url: string | null
          is_verified: boolean
          created_at: string
          created_by: string
          status: 'pending' | 'approved' | 'rejected'
        }
        Insert: {
          id?: string
          title: string
          role: string
          type: string
          description: string
          requirements?: string | null
          deadline: string
          location: string
          roles_available: number
          compensation?: string | null
          production_house?: string | null
          contact_info: string
          image_url?: string | null
          is_verified?: boolean
          created_at?: string
          created_by: string
          status?: 'pending' | 'approved' | 'rejected'
        }
        Update: {
          id?: string
          title?: string
          role?: string
          type?: string
          description?: string
          requirements?: string | null
          deadline?: string
          location?: string
          roles_available?: number
          compensation?: string | null
          production_house?: string | null
          contact_info?: string
          image_url?: string | null
          is_verified?: boolean
          created_at?: string
          created_by?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          casting_call_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          casting_call_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          casting_call_id?: string
          created_at?: string
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