import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { InputFile } from '../input-file/input-file';
import styles from './media.module.scss';

/* eslint-disable-next-line */
export interface MediaProps {
  doctor: any;
  formik: any;
  done: boolean;
  isLoading: boolean;
}

export function Media({ doctor, formik, done, isLoading }: MediaProps) {
  const onUpload = async (files: any, videoSelected = false) => {
    const uploadedFiles = [];

    files.forEach((file) => {
      uploadedFiles.push({
        name: file.name,
        originalUrl: file.url,
      });
    });

    let gallery = [];
    if (videoSelected) {
      gallery = [...doctor.videos, ...uploadedFiles];
      formik.setValues({ ...doctor, videos: gallery });
    } else {
      gallery = [...doctor.gallery, ...uploadedFiles];
      formik.setValues({ ...doctor, gallery });
    }

    formik.handleSubmit();
  };

  const setPreview = (files) => {
    const gallery = [...doctor.gallery, ...files];
    doctor.gallery = gallery;
  };

  const handleDeleteMedia = (deleteIndex, isVideo = false) => {
    if (isVideo) {
      const videos = [
        ...doctor.videos.filter((file, index) => index !== deleteIndex),
      ];
      doctor.videos = [...videos];
      formik.setValues({ ...doctor, videos });
    } else {
      const gallery = [
        ...doctor.gallery.filter((file, index) => index !== deleteIndex),
      ];
      doctor.gallery = [...gallery];
      formik.setValues({ ...doctor, gallery });
    }
    formik.handleSubmit();
  };

  return (
    <div className={styles.media}>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={12}>
            <div
              className={
                doctor.gallery && doctor.gallery.length > 0
                  ? `${styles.mediaListItems}`
                  : `${styles.mediaListItemsNull}`
              }
            >
              <div className={`${styles.mediaItem} ${styles.addMediaItem}`}>
                <div
                  className={`${styles.uploadMedia} bg-white d-flex justify-content-center align-items-center position-relative `}
                >
                  <InputFile
                    multiple
                    accept="video/*"
                    className={styles.uploadImages}
                    onFileUpload={(e) => onUpload(e, true)}
                    setPreview={setPreview}
                  />
                  <div className={`${styles.addMediaCard} text-center`}>
                    <img
                      src="/assets/images/upload-media.svg"
                      alt="upload-media"
                    />
                    <h2 className="mt-3">Upload Video</h2>
                  </div>
                </div>
              </div>
              {doctor.videos && doctor.videos.length > 0
                ? doctor.videos.map((file, index) =>
                    [
                      'MOV',
                      'MP4',
                      'WEBM',
                      'MP3',
                      'mp4',
                      'mov',
                      'mp3',
                      'webm',
                    ].includes(file.name.split('.')[1]) ? (
                      <div className={`${styles.mediaItem}`} key={index}>
                        <video
                          width="340"
                          height="240"
                          loop
                          controls
                          playsInline
                        >
                          <source
                            src={`${file.originalUrl}#t=0.001`}
                            type="video/mp4"
                          />
                        </video>
                        <span className={styles.deleteIcon}>
                          <img
                            src="/assets/images/trash.svg"
                            alt="trash"
                            onClick={() => {
                              handleDeleteMedia(index, true);
                            }}
                          />
                        </span>
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </Col>
        </Row>
      </Form>
      <hr />

      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={12}>
            <div
              className={
                doctor.gallery && doctor.gallery.length > 0
                  ? `${styles.mediaListItems}`
                  : `${styles.mediaListItemsNull}`
              }
            >
              <div className={`${styles.mediaItem} ${styles.addMediaItem}`}>
                <div
                  className={`${styles.uploadMedia} bg-white d-flex justify-content-center align-items-center position-relative `}
                >
                  <InputFile
                    multiple
                    accept="image/*"
                    className={styles.uploadImages}
                    onFileUpload={(e) => onUpload(e, false)}
                    setPreview={setPreview}
                  />
                  <div className={`${styles.addMediaCard} text-center`}>
                    <img
                      src="/assets/images/upload-media.svg"
                      alt="upload-media"
                    />
                    <h2 className="mt-3">Upload Images</h2>
                  </div>
                </div>
              </div>
              {doctor.gallery && doctor.gallery.length > 0
                ? doctor.gallery.map((file, index) =>
                    !['MOV', 'MP4', 'MP3'].includes(file.name.split('.')[1]) ? (
                      <div className={`${styles.mediaItem}`} key={index}>
                        <img
                          style={{ height: '100%' }}
                          src={file.originalUrl}
                          alt="upload-media"
                        />
                        <span className={styles.deleteIcon}>
                          <img
                            src="/assets/images/trash.svg"
                            alt="trash"
                            onClick={() => {
                              handleDeleteMedia(index, false);
                            }}
                          />
                        </span>
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Media;
