
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid VITE_SUPABASE_URL: ${supabaseUrl}`);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

interface FetchCastingCallsParams {
  pageParam?: number;
  category?: string;
  gender?: string;
  minAge?: number;
  maxAge?: number;
  searchQuery?: string;
}

export async function fetchCastingCalls({ 
  pageParam = 0, 
  category = "",
  gender = "",
  minAge,
  maxAge,
  searchQuery = "",
}: FetchCastingCallsParams) {
  try {
    const pageSize = 8;
    
    let query = supabase
      .from('casting_calls')
      .select('*')
      .eq('status', 'approved');

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,role.ilike.%${searchQuery}%`);
    }

    if (category) {
      query = query.eq('type', category);
    }

    if (gender && gender !== 'any') {
      query = query.eq('gender', gender);
    }

    if (minAge !== undefined) {
      query = query.gte('min_age', minAge);
    }
    if (maxAge !== undefined) {
      query = query.lte('max_age', maxAge);
    }

    query = query
      .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1)
      .order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    return {
      items: data || [],
      nextPage: pageParam + 1,
      hasMore: data && data.length === pageSize,
    };
  } catch (error) {
    console.error('Error fetching casting calls:', error);
    throw new Error('Failed to fetch casting calls');
  }
}

export async function toggleFavorite(castingCallId: string, userId: string) {
  try {
    const { data: existing, error: fetchError } = await supabase
      .from('favorites')
      .select()
      .eq('user_id', userId)
      .eq('casting_call_id', castingCallId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    if (existing) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', existing.id);
      
      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, casting_call_id: castingCallId });
      
      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw new Error('Failed to update favorite status');
  }
}
