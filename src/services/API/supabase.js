import { createClient } from "@supabase/supabase-js";
import { aesti_service_key, aestiKey, aestiUrl } from "./api";

export const supabase = createClient(aestiUrl, aestiKey);
export const supabaseAdmin = createClient(aestiUrl, aesti_service_key);
