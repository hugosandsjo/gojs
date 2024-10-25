// Dropzone.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type PreviewFile = File & {
  preview: string;
};

export default function Dropzone() {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <Image src={file.preview} alt={file.name} width={100} height={100} />
    </div>
  ));

  // Clean up the previews when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div>
      <div {...getRootProps()} className="border p-4 w-full">
        <input {...getInputProps()} name="image" />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
      <aside className="flex flex-wrap mt-4 gap-2">{thumbs}</aside>
    </div>
  );
}
