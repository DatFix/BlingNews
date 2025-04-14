import React, { useState } from 'react';
import { Upload, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

interface UploadImageProps {
  onImageUpload?: (url: string) => void; // Callback để gửi URL của ảnh đã upload
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(`<img src="${src}" style="max-width: 100%;"/>`);
    }
  };

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Kiểm tra nếu file đã upload thành công
    newFileList.forEach(file => {
      if (file.status === 'done' && file.response && file.response.url) {
        // Gọi callback để gửi URL
        if (onImageUpload) {
          onImageUpload(file.response.url); // Trả về URL ảnh
        }
      } else if (file.status === 'error') {
        message.error(`${file.name} file upload failed.`);
      }
    });
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action="https://cors-anywhere.herokuapp.com/https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange} // Cập nhật thành handleChange
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImage;
