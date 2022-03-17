import React, { useState } from 'react';
import { s3FileUpload, IFile } from '@utils';
import config from '@config';

import './input-file.module.scss';
import { Spinner } from 'react-bootstrap';
import useDoctorProfile from '../../hooks/useDoctorProfile';

type OnFileUpload = (key: IFile[] | IFile) => any;
export interface InputFileProps {
  onFileUpload: OnFileUpload;
  setPreview?: any;
  multiple?: any
  accept?: string;
  className?: string;
  id?: string;
  ref?: any;
}

export function InputFile(props: InputFileProps, ref) {
  const {
    className,
    id,
    multiple,
    accept,
    onFileUpload,
    setPreview,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const { isLoading: doctorProfileLoading } = useDoctorProfile();

  const onFileChange = async (event) => {
    if (!event.target.files.length) {
      return;
    }
    setIsLoading(true);
    const selectedFiles = Object.values(event.target.files);

    // Displaying a preview of an image before actual s3 uploading
    if (!multiple && setPreview) {
      const file = {
        url: URL.createObjectURL(event.target.files[0])
      }
      setPreview(file);
    }

    const filesToUplaod = selectedFiles.map((file) => s3FileUpload(file as IFile));

    const filesKeys = await Promise.all(filesToUplaod);

    setIsLoading(false);

    const newFiles = filesKeys.map((key) => ({
      name: key,
      url: config.s3.BUCKET_URL + key,
    }));

    if (!multiple) {
      return onFileUpload(newFiles[0]);
    }
    return onFileUpload(newFiles);
  };

  return (
    <div className="input-file">
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={onFileChange}
        className={className}
        id={id}
      />
      {(isLoading || doctorProfileLoading) && <Spinner animation="border" variant="info" />}
    </div>
  );
}
