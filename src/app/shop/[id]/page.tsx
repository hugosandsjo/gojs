import SingleProduct from "@/app/components/SingleProduct";

export default function ProductPage({ params }: { params: { id: string } }) {
  return <SingleProduct params={params} />;
}
