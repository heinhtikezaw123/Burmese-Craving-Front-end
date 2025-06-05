import React, { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import clsx from "clsx"; // Optional: use this for cleaner conditional class logic

type Props = {
    onChange?: (file: File | null) => void;
};

const ImageUpload = ({ onChange }: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;

        if (selectedFile) {
            setFile(selectedFile);
            onChange?.(selectedFile);

            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);

            // Simulate upload progress
            setUploading(true);
            setUploadProgress(0);
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 150);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <div className="w-full">
            <div
                className={clsx(
                    "relative w-full h-64 border-2 border-dashed rounded-xl flex items-center justify-center transition",
                    previewUrl
                        ? "bg-white border-primary"
                        : "bg-gray-50 border-gray-300 hover:border-primary"
                )}
            >
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {!previewUrl && (
                    <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center text-gray-500 hover:text-primary cursor-pointer"
                    >
                        <FiUploadCloud className="text-4xl mb-2" />
                        <span className="font-medium text-sm">Click to upload</span>
                        <span className="text-xs text-gray-400 mt-1">
                            PNG, JPG, JPEG (max. 5MB)
                        </span>
                    </label>
                )}

                {previewUrl && (
                    <label htmlFor="image-upload" className="w-full h-full cursor-pointer">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-xl"
                        />
                    </label>
                )}

                {/* Progress Bar */}
                {uploading && (
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200 rounded-b-md overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-200"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
