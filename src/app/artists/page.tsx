import H2 from "@/app/components/typography/H2";
import H3 from "@/app/components/typography/H3";
import { getAllArtists } from "@/lib/actions";
import Link from "next/link";

export default async function ArtistsPage() {
  const artists = await getAllArtists();

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full gap-20 p-20">
        <H2>Artists:</H2>
        <div className="flex flex-wrap gap-8 justify-center">
          {artists.map((artist) => (
            <Link key={artist.id} href={`artists/${artist.id}`}>
              <H3 key={artist.id}>{artist.name}</H3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
