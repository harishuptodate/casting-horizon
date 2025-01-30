import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, castingCall, id } = await req.json()
    console.log(`Processing ${action} for casting call`, { castingCall, id })

    switch (action) {
      case 'create':
        const { data: newCasting, error: createError } = await supabase
          .from('casting_calls')
          .insert([castingCall])
          .select()
          .single()
        
        if (createError) throw createError
        console.log('Created new casting call:', newCasting)
        
        return new Response(JSON.stringify(newCasting), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'approve':
        const { data: approvedCasting, error: approveError } = await supabase
          .from('casting_calls')
          .update({ status: 'approved' })
          .eq('id', id)
          .select()
          .single()
        
        if (approveError) throw approveError
        console.log('Approved casting call:', approvedCasting)
        
        return new Response(JSON.stringify(approvedCasting), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'reject':
        const { data: rejectedCasting, error: rejectError } = await supabase
          .from('casting_calls')
          .update({ status: 'rejected' })
          .eq('id', id)
          .select()
          .single()
        
        if (rejectError) throw rejectError
        console.log('Rejected casting call:', rejectedCasting)
        
        return new Response(JSON.stringify(rejectedCasting), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'getPending':
        const { data: pendingCastings, error: pendingError } = await supabase
          .from('casting_calls')
          .select('*, profiles(full_name, email)')
          .eq('status', 'pending')
        
        if (pendingError) throw pendingError
        console.log('Retrieved pending castings:', pendingCastings)
        
        return new Response(JSON.stringify(pendingCastings), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})