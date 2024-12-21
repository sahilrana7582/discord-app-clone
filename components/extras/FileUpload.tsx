import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from 'sonner';
import '@uploadthing/react/styles.css';
import Image from 'next/image';

interface FileUploadProp {
  endPoint: 'serverImage' | 'messageFile';
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = ({ endPoint, value, onChange }: FileUploadProp) => {
  if (value) {
    return (
      <div className="relative h-40 w-40">
        <Image
          src={value}
          alt="Upload"
          width={250}
          height={550}
          className="rounded-full aspect-square"
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);

        toast.success(`Image Uploaded`);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}`);
      }}
    />
  );
};

export default FileUpload;
