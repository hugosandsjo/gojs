// Dropzone.tsx
import React from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone() {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: true,
    });

  const files = acceptedFiles.map((file) => (
    <div key={file.name}>
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        style={{ width: "100px" }}
      />
    </div>
  ));

  return (
    <div>
      <div {...getRootProps()} className="border p-4 w-full">
        <input {...getInputProps()} name="image" />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <aside className="flex flex-wrap mt-4 gap-2">{files}</aside>
    </div>
  );
}
