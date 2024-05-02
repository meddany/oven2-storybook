// @ts-nocheck

import React, { Component , useEffect ,useRef,useState } from 'react';
import draftToHtml from 'draftjs-to-html'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File;


const OvenRichEditor = props => {

    const editor = useRef(null);
    const [disable , setDisable] = useState(false)
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
        };


    useEffect( () => {
        if (editor.current) {
            editor.current.setContents(props.defaultText)
        }
    } , [props.defaultText])


    useEffect( () => {
        if ( props.disable === false ){
            editor.current.disabled()
        }
        else {
            editor.current.enabled()
        }
    } , [props.disable])


    return (
        <SunEditor 
        getSunEditorInstance={getSunEditorInstance} 
        name="ann-edi"
        autoFocus={true}
        height="auto"
        disable={disable}
        setContents = {props.defaultText}
        onChange={(c) => {
            props.setNewText(c)
        }}
        setOptions={
            {
                "mode": "classic",
                "rtl": false,
                "katex": "window.katex",
                "videoFileInput": false,
                "tabDisable": false,
                "buttonList": [
                    [
                        "undo",
                        "redo",
                        "font",
                        "fontSize",
                        "formatBlock",
                        "paragraphStyle",
                        "blockquote",
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript",
                        "fontColor",
                        "hiliteColor",
                        "textStyle",
                        "removeFormat",
                        "outdent",
                        "indent",
                        "align",
                        "horizontalRule",
                        "list",
                        "lineHeight",
                        "table",
                        "link",
                        // "image",
                        // "video",
                        // "audio",
                        "math",
                        "imageGallery",
                        "fullScreen",
                        "showBlocks",
                        "preview",
                    ]
                ],
                "lang(In nodejs)": "en"
            }
        }
        />
    );
  };
  export default OvenRichEditor;