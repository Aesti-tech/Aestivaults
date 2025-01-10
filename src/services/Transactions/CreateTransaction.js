import { supabase } from "../API/supabase";

async function createTransactionFN({
  amount,
  type,
  username,
  user_email,
  user_id,
  reference_id,
  transaction_id,
  details,
  user_data,
}) {
  const { data, error } = await supabase
    .from("Transactions")
    .insert([
      {
        amount,
        type,
        status: "PENDING",
        username,
        user_email,
        user_id,
        reference_id,
        transaction_id,
        details,
        user_data,
      },
    ])
    .select();

  if (error)
    throw new Error(error.message, "there was an error creating an invoice");

  return data;
}

export { createTransactionFN };
