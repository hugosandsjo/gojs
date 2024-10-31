"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type PreviewFile = File & { preview: string };
type PreviewImage = { name: string; preview: string };

type DropzoneProps = {
  defaultImages?: PreviewImage[];
};

export default function Dropzone({ defaultImages }: DropzoneProps) {
  const [files, setFiles] = useState<(PreviewFile | PreviewImage)[]>([]);

  useEffect(() => {
    if (defaultImages && defaultImages.length > 0) {
      const initialFiles = defaultImages.map((image) => ({
        name: image.name,
        preview: image.preview,
      }));
      setFiles(initialFiles);
    }
  }, [defaultImages]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
  }, []);

  const removeFile = useCallback((fileName: string) => {
    setFiles((prevFiles) => {
      const filteredFiles = prevFiles.filter((file) => file.name !== fileName);
      // Revoke the URL for the removed file
      const removedFile = prevFiles.find((file) => file.name === fileName);
      if (removedFile) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return filteredFiles;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
    preventDropOnDocument: true,
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="relative group">
      <div className="relative w-24 h-24">
        <Image
          src={file.preview}
          alt={file.name}
          sizes="96px"
          fill
          className="object-cover rounded-md"
        />
      </div>
      <button
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          removeFile(file.name);
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ×
      </button>
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if ("preview" in file && file instanceof File) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  });

  const rootProps = getRootProps();

  return (
    <div className="mt-2">
      <div
        {...rootProps}
        className={`
          border-2 border-dashed border-gray-300 rounded-lg py-16 cursor-pointer 
          transition-colors duration-200 ease-in-out
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "hover:border-gray-400"
          }
        `}
        onClick={(e) => {
          e.preventDefault();
          rootProps.onClick?.(e);
        }}
      >
        <input {...getInputProps()} name="image" />
        {isDragActive ? (
          <p className="text-center text-gray-600 ">Drop the files here...</p>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          </div>
        )}
      </div>
      {files.length > 0 && (
        <aside className="flex flex-wrap mt-4 gap-4">{thumbs}</aside>
      )}
    </div>
  );
}
