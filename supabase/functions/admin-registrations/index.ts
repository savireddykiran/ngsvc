import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Hardcoded admin credentials (for demo purposes - in production use proper auth)
const ADMIN_EMAIL = 'vibecoding@gmail.com'
const ADMIN_PASSWORD = 'Vib3C0ding'

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    // Parse request body for POST requests
    let body = {}
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      body = await req.json()
    }

    // Login action
    if (action === 'login' && req.method === 'POST') {
      const { email, password } = body as { email: string; password: string }
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Generate a simple session token (in production, use proper JWT)
        const sessionToken = btoa(`${email}:${Date.now()}:${crypto.randomUUID()}`)
        console.log('Admin login successful')
        return new Response(
          JSON.stringify({ success: true, token: sessionToken }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } else {
        console.log('Admin login failed - invalid credentials')
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid credentials' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Verify admin token for protected routes
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    try {
      const decoded = atob(token)
      if (!decoded.startsWith(ADMIN_EMAIL)) {
        throw new Error('Invalid token')
      }
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get all registrations
    if (action === 'list' && req.method === 'GET') {
      console.log('Fetching all registrations')
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching registrations:', error)
        throw error
      }

      console.log(`Found ${data?.length || 0} registrations`)
      return new Response(
        JSON.stringify({ data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Delete a registration
    if (action === 'delete' && req.method === 'DELETE') {
      const { id } = body as { id: string }
      console.log('Deleting registration:', id)
      
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting registration:', error)
        throw error
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update a registration
    if (action === 'update' && req.method === 'PUT') {
      const { id, ...updates } = body as { id: string; [key: string]: unknown }
      console.log('Updating registration:', id)
      
      const { data, error } = await supabase
        .from('registrations')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating registration:', error)
        throw error
      }

      return new Response(
        JSON.stringify({ data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})