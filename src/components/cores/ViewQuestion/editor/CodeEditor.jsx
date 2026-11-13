import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";


const starterCode = {
  cpp:
`#include <bits/stdc++.h>
using namespace std;

class Solution{

public:

};
`,

  java:
`class Solution{

}
`,

  python:
`class Solution:

    pass
`,
};

const languageMap = {
  cpp: "cpp",
  java: "java",
  python: "python",
};

const CodeEditor = () => {
  const [language, setLanguage] = useState("cpp");

  const [fontSize, setFontSize] = useState(16);

  const [code, setCode] = useState(starterCode.cpp);

  useEffect(() => {
    setCode(starterCode[language]);
  }, [language]);

  return (
    <div className="h-full flex flex-col">


      <div className="flex-1">

        <Editor
          height="100%"
          language={languageMap[language]}
          value={code}
          onChange={(value)=>setCode(value)}
          theme="vs-dark"

          options={{

            minimap:{
              enabled:false,
            },

            fontSize:14,

            scrollBeyondLastLine:false,

            automaticLayout:true,

            roundedSelection:true,

            wordWrap:"on",

            fontLigatures:true,

          }}

        />

      </div>

    </div>
  );
};

export default CodeEditor;