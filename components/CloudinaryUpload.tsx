"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload as UploadIcon, X } from "lucide-react";
import Image from "next/image";
import { BookingData } from "@/components/BookingForm";
import React from "react";
import { te } from "date-fns/locale";

interface UploadProps {
  onSuccess: (imageUrl: string) => void;
  form: BookingData;
  setForm: React.Dispatch<React.SetStateAction<BookingData>>;
}

export default function Upload({ onSuccess, form, setForm }: UploadProps) {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [publicId, setPublicId] = React.useState<string | null>(null);

  // This will hold the latest uploaded URL temporarily until user closes
  const tempUploadedUrl = React.useRef<string | null>(null);

  const handleRemoveUpload = async () => {
    setImageUrl(null);
    tempUploadedUrl.current = null;
    setForm((prev: BookingData) => ({ ...prev, proofOfPaymentUrl: null }));

    if (publicId) {
      await fetch("/api/upload/delete-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      setPublicId(null);
    }
  };

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={async (result: any) => {
        const url = result?.info?.secure_url;
        const id = result?.info?.public_id;

        if (!url || !id) return;

        setImageUrl(url);
        setPublicId(id);

        // Store in ref temporarily; do NOT update form yet
        tempUploadedUrl.current = url;

        // Optional: save to backend immediately
        await fetch("/api/upload/save-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: url, publicId: id }),
        });
      }}
      onClose={() => {
        // Only update form when widget closes
        if (tempUploadedUrl.current) {
          setForm((prev: BookingData) => ({
            ...prev,
            proofOfPaymentUrl: tempUploadedUrl.current,
          }));
          onSuccess(tempUploadedUrl.current);
        }
      }}
    >
      {({ open }) => (
        <div className="w-full">
          {imageUrl ? (
            <div className="relative mt-1 rounded-lg overflow-hidden border border-border">
              <Image
                src={imageUrl}
                alt="Uploaded image"
                width={200}
                height={200}
                className="object-contain bg-muted w-full max-h-48"
              />
              <button
                type="button"
                onClick={handleRemoveUpload}
                className="absolute top-2 right-2 bg-foreground/70 text-background rounded-full p-1 hover:bg-foreground transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => open()}
              className="mt-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-14 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UploadIcon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">
                Click to upload payment screenshot
              </span>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}