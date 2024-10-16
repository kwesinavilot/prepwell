import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FileUpload = ({
    mode = 'vertical',
    uploadMode = 'single',
    defaultText = 'Upload file',
    otherText = 'You can also upload multiple files',
    maxSize = 5 * 1024 * 1024, // 5MB
    acceptedFileTypes = {
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    errors,
    onFilesUploaded,
    zodSchema
}) => {
    const [files, setFiles] = useState([]);
    const [internalErrors, setInternalErrors] = useState(null);

    const validateFile = (file) => {
        if (!file) {
            return "No file(s) selected";
        }
        if (zodSchema) {
            try {
                zodSchema.parse({ resume: file });
                return null;
            } catch (error) {
                console.log("Validation error:", error);
                return error.errors[0]?.message || "Invalid file type selected";
            }
        }
        return null;
    };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) {
            setInternalErrors("Please select a valid file");
            return;
        }

        const newFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));

        let validationError = null;
        if (uploadMode === 'single') {
            validationError = validateFile(newFiles[0]);

            if (!validationError) {
                setFiles(newFiles.slice(0, 1));
                onFilesUploaded(newFiles[0]);
                setInternalErrors(null);
            } else {
                setInternalErrors(validationError);
            }
        } else {
            const errors = newFiles.map(validateFile).filter(Boolean);
            if (errors.length === 0) {
                setFiles(prev => [...prev, ...newFiles]);
                onFilesUploaded(newFiles);
                setInternalErrors(null);
            } else {
                setInternalErrors(errors[0]); // Display only the first error
            }
        }
    }, [uploadMode, onFilesUploaded, zodSchema]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxSize,
        multiple: uploadMode === 'multi'
    });

    const removeFile = (file) => {
        const newFiles = files.filter(f => f !== file);
        setFiles(newFiles);
        onFilesUploaded(uploadMode === 'single' ? null : newFiles);
        setInternalErrors(null);
    };

    const dropzoneClasses = cn(
        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
        isDragActive ? "border-blue-500 bg-blue-50" : (internalErrors || errors) ? "border-red-500" : "border-gray-300 hover:border-gray-400",
        mode === 'horizontal' ? "flex items-center justify-center space-x-4" : "flex flex-col justify-center items-center space-y-2"
    );

    const renderDropzone = () => (
        <>
            <div {...getRootProps({ className: dropzoneClasses })}>
                <input {...getInputProps()} />
                <UploadIcon className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-600">{defaultText}</p>
                <p className="text-xs text-gray-500">{otherText}</p>
            </div>

            {(internalErrors || errors) && (
                <p className="text-xs font-medium text-red-500 mt-2">
                    {internalErrors || errors}
                </p>
            )}
        </>
    );

    const renderFileList = () => (
        <div className="mt-4 space-y-2">
            {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 shadow">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center p-5">
                            <span className="text-xs font-medium">{file.name.split('.').pop().toUpperCase()}</span>
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => removeFile(file)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            {(uploadMode === 'multi' || files.length === 0) && renderDropzone()}
            {renderFileList()}
        </div>
    );
};

export default FileUpload;