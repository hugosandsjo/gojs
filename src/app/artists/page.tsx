import H2 from "@/app/components/typography/H2";
import { getAllArtists } from "@/lib/actions";
import Link from "next/link";

type pageProps = {};

export default async function ArtistsPage({}: pageProps) {
  const artists = await getAllArtists();
  console.log(artists);

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full gap-20 p-20">
        <H2>Artists page</H2>
        <div className="flex flex-wrap gap-8">
          {artists.map((artist) => (
            <Link key={artist.id} href={`artists/${artist.id}`}>
              <p key={artist.id}>{artist.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
