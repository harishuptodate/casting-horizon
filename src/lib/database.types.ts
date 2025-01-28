export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'user' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
        };
      };
      casting_calls: {
        Row: {
          id: string;
          title: string;
          role: string;
          type: string;
          description: string;
          image: string;
          deadline: string;
          location: string;
          roles: number;
          created_by: string;
          created_at: string;
          status: 'pending' | 'approved' | 'rejected';
          is_verified: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          role: string;
          type: string;
          description: string;
          image: string;
          deadline: string;
          location: string;
          roles: number;
          created_by: string;
          created_at?: string;
          status?: 'pending' | 'approved' | 'rejected';
          is_verified?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          role?: string;
          type?: string;
          description?: string;
          image?: string;
          deadline?: string;
          location?: string;
          roles?: number;
          created_by?: string;
          created_at?: string;
          status?: 'pending' | 'approved' | 'rejected';
          is_verified?: boolean;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          casting_call_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          casting_call_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          casting_call_id?: string;
          created_at?: string;
        };
      };
    };
  };
}