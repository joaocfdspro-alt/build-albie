import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, setup_key } = await req.json();

    // Simple one-time setup protection
    const expectedKey = Deno.env.get("ADMIN_SETUP_KEY");
    if (!expectedKey || setup_key !== expectedKey) {
      return new Response(JSON.stringify({ error: "Invalid setup key" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Try to create user, or update if exists
    let userId: string;
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      if (createError.message.includes("already been registered")) {
        // User exists — find and update password
        const { data: { users } } = await adminClient.auth.admin.listUsers();
        const existing = users?.find((u: any) => u.email === email);
        if (!existing) {
          return new Response(JSON.stringify({ error: "User not found" }), { status: 400, headers: corsHeaders });
        }
        await adminClient.auth.admin.updateUserById(existing.id, { password, email_confirm: true });
        userId = existing.id;
      } else {
        return new Response(JSON.stringify({ error: createError.message }), { status: 400, headers: corsHeaders });
      }
    } else {
      userId = newUser.user.id;
    }

    // Ensure admin role
    await adminClient.from("user_roles").upsert({
      user_id: userId,
      role: "admin",
    }, { onConflict: "user_id,role" });

    return new Response(
      JSON.stringify({ success: true, message: "Admin user created" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
