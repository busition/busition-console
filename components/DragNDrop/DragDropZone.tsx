import { useState } from "react";

type FileData = {
  name: string;
  size: number;
  type: string;
  data: ArrayBuffer;
};

export default function DragDropZone() {
  const [files, setFiles] = useState<FileData[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const fileList = Array.from(event.dataTransfer.files);
    const promises = fileList.map((file) => {
      return new Promise<FileData>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileData: FileData = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: reader.result as ArrayBuffer,
          };
          resolve(fileData);
        };
        reader.readAsArrayBuffer(file);
      });
    });
    Promise.all(promises).then((fileDataArray) => {
      const csvFiles = fileDataArray.filter((file) => file.type === "text/csv");
      if (csvFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...csvFiles]);
      }
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="border-2 border-dashed border-green-500 text-center w-full h-full flex flex-col justify-center items-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h1>Upload Files</h1>
      <p>Drag and drop your files here</p>
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <div>Name: {file.name}</div>
              <div>Size: {file.size} bytes</div>
              <div>Type: {file.type}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
