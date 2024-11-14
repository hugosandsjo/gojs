import { getArtist } from "@/lib/actions";

export default async function ArtistPage({
  params,
}: {
  params: { id: string };
}) {
  const artist = await getArtist(params.id);
  return (
    <section className="flex w-full justify-center h-svh items-center gap-20">
      <div className="bg-slate-700 h-60 w-48"></div>
      <div className="flex flex-col gap-4">
        <p>Singe artist page:</p>
        <p>{artist?.name}</p>
        <p>{artist?.email}</p>
      </div>
    </section>
  );
}
