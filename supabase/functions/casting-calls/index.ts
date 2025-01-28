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

    const { action, castingCall } = await req.json()

    switch (action) {
      case 'create':
        const { data: newCasting, error: createError } = await supabase
          .from('casting_calls')
          .insert([castingCall])
          .select()
        
        if (createError) throw createError
        return new Response(JSON.stringify(newCasting[0]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'approve':
        const { id } = castingCall
        const { data: approvedCasting, error: approveError } = await supabase
          .from('casting_calls')
          .update({ status: 'approved' })
          .eq('id', id)
          .select()
        
        if (approveError) throw approveError
        return new Response(JSON.stringify(approvedCasting[0]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})