import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Note: This is a placeholder for the web scraping logic
    // We'll need to set up proper web scraping tools and implement the logic
    const mockScrapedData = {
      title: "Scraped Casting Call",
      role: "Actor",
      type: "Film",
      description: "This is a scraped casting call",
      image: "https://example.com/image.jpg",
      deadline: new Date().toISOString(),
      location: "Los Angeles, CA",
      roles: 1,
    }

    const { data: newCasting, error } = await supabase
      .from('casting_calls')
      .insert([mockScrapedData])
      .select()

    if (error) throw error

    return new Response(JSON.stringify(newCasting[0]), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})