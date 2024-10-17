import TestComponent from "@/app/components/TestComponent";

export default function Shop() {
  return (
    <section className="flex flex-col w-full bg-blue-900 items-center gap-8">
      <h1 className="text-6xl font-serif">Shop</h1>
      <TestComponent />
    </section>
  );
}
