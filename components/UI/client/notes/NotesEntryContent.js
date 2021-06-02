import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NotesEntryContent() {
  const [text, setText] = useState("<h1>test</h1>");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["image", "blockquote", "code-block"],
      ["clean"],
    ],
  };

  const handleChange = (content, delta, source, editor) => {
    console.log(editor.getHTML());

    // console.log(editor.getContents());
    // console.log(editor);
    // console.log(delta);
    // console.log(source);
    // console.log(content);
  };

  return (
    <div className="container bg-gray-100">
      <ReactQuill
        theme="snow"
        modules={modules}
        defaultValue={text}
        onChange={handleChange}
      />
    </div>
  );
}
