import { uploadImage } from "@/lib/actions";
export default function ImageForm() {
  return (
    <section>
      <p>ImageForm</p>
      <form action={uploadImage}>
        <label>
          Select Image:
          <input type="file" name="image" accept="image/*" />
        </label>
        <button className="border" type="submit">
          Upload
        </button>
      </form>
    </section>
  );
}
