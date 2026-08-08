import useFetch from "@/hooks/useFetch";

export async function books() {
    return await useFetch("get", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, "", "", false);
}