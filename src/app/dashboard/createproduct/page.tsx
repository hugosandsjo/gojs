import CreateProductForm from "@/app/components/CreateProductForm";

export default function CreateProductPage() {
  return (
    <section className="flex flex-col px-36 py-16 justify-center gap-8 items-center">
      <h1 className="font-serif text-6xl">Create new product</h1>
      <CreateProductForm />
    </section>
  );
}
