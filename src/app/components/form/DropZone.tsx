import React, { useState, useEffect, useCallback } from "react";
import { MAX_FILE_SIZE, ALLOWED_FORMATS } from "@/lib/constants";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

type PreviewFile = File & { preview: string };
type PreviewImage = { name: string; preview: string };

type DropzoneProps = {
  defaultImages?: PreviewImage[];
  onFilesChange: (files: File[]) => void;
  onImageRemove?: (imageId: string) => void;
};

export default function Dropzone({
  defaultImages = [],
  onFilesChange,
  onImageRemove,
}: DropzoneProps) {
  const [files, setFiles] = useState<(PreviewFile | PreviewImage)[]>([]);

  useEffect(() => {
    if (defaultImages.length > 0) {
      setFiles(defaultImages);
    }
  }, [defaultImages]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log("onDrop called with files:", acceptedFiles.length);

      if (acceptedFiles.length === 0) return;

      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          alert(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)} MB`);
          return false;
        }
        if (!ALLOWED_FORMATS.includes(file.type)) {
          alert("Invalid file format. Only JPEG and PNG are allowed.");
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      // Create a Map to ensure uniqueness
      const uniqueFiles = new Map<string, File>();
      validFiles.forEach((file) => {
        uniqueFiles.set(file.name, file);
      });

      const mappedFiles = Array.from(uniqueFiles.values()).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles((prevFiles) => {
        // Remove any existing files with the same names
        const existingFiles = prevFiles.filter(
          (prevFile) => !uniqueFiles.has(prevFile.name)
        );
        return [...existingFiles, ...mappedFiles];
      });

      onFilesChange(mappedFiles);
    },
    [onFilesChange]
  );

  const handleRemoveFile = useCallback(
    (e: React.MouseEvent, fileName: string) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("Removing file:", fileName);

      setFiles((prevFiles) => {
        const filteredFiles = prevFiles.filter(
          (file) => file.name !== fileName
        );

        const removedFile = prevFiles.find((file) => file.name === fileName);
        if (removedFile && !(removedFile instanceof File) && onImageRemove) {
          onImageRemove(fileName);
        } else {
          const remainingFiles = filteredFiles.filter(
            (file): file is PreviewFile => file instanceof File
          );
          onFilesChange(remainingFiles);
        }

        return filteredFiles;
      });
    },
    [onFilesChange, onImageRemove]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
    noClick: true,
    preventDropOnDocument: true,
  });

  useEffect(() => {
    return () => {
      console.log("Cleaning up file previews");
      files.forEach((file) => {
        if (file instanceof File && "preview" in file) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return (
    <div className="my-2">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed border-gray-300 rounded-lg h-48 transition-colors duration-200 ease-in-out ${
          isDragActive ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} name="images" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-gray-600 mb-4">
            {isDragActive
              ? "Drop the files here..."
              : "Drag 'n' drop some files here"}
          </p>
          <button
            type="button"
            onClick={open}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Select Files
          </button>
        </div>
      </div>
      {files.length > 0 && (
        <aside className="flex flex-wrap mt-4 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="relative group"
              onClick={(e) => e.stopPropagation()}
            >
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
                onClick={(e) => handleRemoveFile(e, file.name)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </aside>
      )}
    </div>
  );
}
