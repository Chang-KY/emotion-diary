import {supabase} from "@/lib/supabase.ts";

export const uploadImageToDiary = async (file: File, date: Date, id?: string) => {
  const filePath = `diary/${id}/${new Date(date).toDateString()}_${file.name}`;
  const {error: uploadError} = await supabase.storage
    .from('diary')
    .upload(filePath, file);

  if (uploadError) throw new Error(uploadError.message);

  const {
    data: {publicUrl},
  } = supabase.storage.from('diary').getPublicUrl(filePath);

  return publicUrl;
};
