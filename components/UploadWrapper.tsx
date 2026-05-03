import { BookingData } from "@/components/BookingForm";
import Upload from "@/components/CloudinaryUpload";
import { Dispatch, SetStateAction } from "react";


interface UploadWrapperProps {
  setForm: Dispatch<SetStateAction<BookingData>>;
  form: BookingData;
}

const UploadWrapper = ({ setForm, form }: UploadWrapperProps) => {
  return (
    <Upload
      setForm={setForm}
      form={form}
      onSuccess={(imageUrl: string) => {
        setForm((prev: BookingData) => ({ ...prev, proofOfPaymentUrl: imageUrl }));
      }}
    />
  );
};

export default UploadWrapper;