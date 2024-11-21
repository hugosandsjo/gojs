import { getArtist } from "@/lib/actions";
import SingleProductParagraph from "@/app/components/typography/SingleProductParagraph";
import H2 from "@/app/components/typography/H2";
import BackButton from "@/app/components/buttons/BackButton";

export default async function ArtistPage({
  params,
}: {
  params: { id: string };
}) {
  const artist = await getArtist(params.id);
  return (
    <section className="flex flex-col h-svh">
      <article className="flex items-center flex-col w-full justify-center gap-10 md:px-44 p-8">
        <div className="flex w-full">
          <BackButton size={12} />
        </div>
        <div className="bg-slate-100 h-96 w-80 flex justify-center items-center">
          No image available
        </div>
        <div className="flex flex-col gap-6 max-w-96">
          <H2>{artist?.name}</H2>
          <SingleProductParagraph>{artist?.email}</SingleProductParagraph>
          <SingleProductParagraph>{artist?.bio}</SingleProductParagraph>
          <SingleProductParagraph>{artist?.facebook}</SingleProductParagraph>
          <SingleProductParagraph>{artist?.instagram}</SingleProductParagraph>
          <SingleProductParagraph>{artist?.website}</SingleProductParagraph>
        </div>
      </article>
    </section>
  );
}
