import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
    initialValue?: string;
    onChange?: (content: string) => void; // Thay đổi từ onSave thành onChange
    height?: number;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    initialValue = '',
    onChange,
    height = 500,
    placeholder = 'Viết nội dung của bạn ở đây...'
}) => {
    const [content, setContent] = useState<string>(initialValue);
    const editorRef = useRef<any>(null);

    // Thêm style cho toàn bộ ứng dụng để đảm bảo các menu của TinyMCE hiển thị đúng
    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
      /* Đảm bảo các dropdown menu và dialog của TinyMCE luôn ở trên cùng */
      .tox-tinymce-aux, 
      .tox-dialog, 
      .tox-dialog__header,
      .tox-selectfield__dropdown,
      .tox-collection--list,
      .tox-menu,
      .tox-collection--toolbar,
      .tox-collection--grid,
      .tox-swatches-menu,
      .tox-tooltip,
      .tox-insert-table-picker {
        z-index: 999999 !important;
      }
      
      /* Đảm bảo nền mờ của dialog cũng ở trên các lớp khác */
      .tox-dialog-wrap__backdrop {
        z-index: 999998 !important;
      }
      
      /* Đảm bảo container chính của editor cũng có z-index cao */
      .tox.tox-tinymce {
        z-index: 1 !important;
      }
      
      /* Đảm bảo toolbar có z-index cao hơn so với content */
      .tox .tox-toolbar,
      .tox .tox-toolbar__primary,
      .tox .tox-toolbar__overflow {
        z-index: 2 !important;
      }
    `;
        document.head.appendChild(styleEl);

        return () => {
            // Clean up khi component unmount
            document.head.removeChild(styleEl);
        };
    }, []);

    const handleEditorChange = (content: string) => {
        setContent(content);
        if (onChange) {
            onChange(content); // Gọi onChange mỗi khi nội dung thay đổi
        }
    };

    return (
        <div className="rich-text-editor-container">
            <div className="editor-wrapper">
                <Editor
                    apiKey="3kytd2f2swym8ihuta5oib027eon1wzug7qgjrr2upwcwvid" // Đăng ký miễn phí tại https://www.tiny.cloud/
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={initialValue}
                    value={content}
                    onEditorChange={handleEditorChange} // Gọi handleEditorChange để cập nhật nội dung
                    init={{
                        height,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                            'emoticons'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help | image media | emoticons | preview',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        placeholder,
                        ui_mode: 'split',
                        fixed_toolbar_container: '.editor-toolbar-container',
                        inline: false,
                        images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result as string);
                            reader.onerror = () => reject('Không thể tải lên hình ảnh');
                            reader.readAsDataURL(blobInfo.blob());
                        })
                    }}
                />
            </div>
        </div>
    );
};

export default RichTextEditor;
