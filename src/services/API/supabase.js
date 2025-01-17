import { createClient } from "@supabase/supabase-js";
import { aestiKey, aestiUrl } from "./api";

export const supabase = createClient(aestiUrl, aestiKey);
