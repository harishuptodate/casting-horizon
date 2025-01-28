export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  created_at: string;
  role: 'user' | 'admin';
}

export interface CastingCall {
  id: string;
  title: string;
  role: string;
  type: string;
  description: string;
  requirements?: string;
  deadline: string;
  location: string;
  roles_available: number;
  compensation?: string;
  production_house?: string;
  contact_info: string;
  image_url?: string;
  is_verified: boolean;
  created_at: string;
  created_by: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Favorite {
  id: string;
  user_id: string;
  casting_call_id: string;
  created_at: string;
}