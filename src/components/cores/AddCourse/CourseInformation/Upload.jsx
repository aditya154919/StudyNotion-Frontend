// import { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { FiUploadCloud } from "react-icons/fi";
// import { useSelector } from "react-redux";

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   video = false,
//   viewData = null,
//   editData = null,
// }) {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewSource, setPreviewSource] = useState(
//     viewData || editData || "",
//   );
//   const { step } = useSelector((state) => state.course);
//   console.log("Step",step)

//   /* ---------------- DROP HANDLER ---------------- */
//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     setSelectedFile(file);

//     if (video) {
//       const objectURL = URL.createObjectURL(file);
//       setPreviewSource(objectURL);
//     } else {
//       previewImage(file);
//     }
//   };

//   /* ---------------- DROPZONE ---------------- */
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: video
//       ? { "video/*": [".mp4"] }
//       : { "image/*": [".jpg", ".jpeg", ".png"] },
//     multiple: false,
//     onDrop,
//   });

//   /* ---------------- IMAGE PREVIEW ---------------- */
//   const previewImage = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setPreviewSource(reader.result);
//     };
//   };

//   /* ---------------- REGISTER FIELD (CONDITIONAL REQUIRED) ---------------- */
//   useEffect(() => {
//     register(name, {
//       required: !editData && !viewData,
//     });
//   }, [register, name, editData, viewData]);

//   /* ---------------- SET FILE TO FORM ---------------- */
//   useEffect(() => {
//     if (selectedFile) {
//       setValue(name, selectedFile, { shouldValidate: true });
//     }
//   }, [selectedFile, setValue, name]);

//   /* ---------------- SET EXISTING FILE (EDIT MODE) ---------------- */
//   useEffect(() => {
//     if (editData || viewData) {
//       setValue(name, "existing-file", { shouldValidate: false });
//     }
//   }, [editData, viewData, setValue, name]);

//   /* ---------------- CLEANUP OBJECT URL ---------------- */
//   useEffect(() => {
//     return () => {
//       if (video && previewSource) {
//         URL.revokeObjectURL(previewSource);
//       }
//     };
//   }, [previewSource, video]);

//   /* ---------------- CLEAR FILE ---------------- */
//   const clearFile = () => {
//     setSelectedFile(null);
//     setPreviewSource("");
//     setValue(name, null, { shouldValidate: true });
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* LABEL */}
//       <label className="text-sm text-[#F1F2FF]">
//         {label}{" "}
//         {!editData && !viewData && <sup className="text-red-400">*</sup>}
//       </label>

//       {/* UPLOAD BOX */}
//       <div
//         className={`min-h-62.5 rounded-md border-2 border-dashed
//         ${isDragActive ? "bg-[#424854]" : "bg-[#2C333F]"}
//         flex items-center justify-center`}
//       >
//         {previewSource ? (
//           <div className="w-full p-4">
//             {!video ? (
//               step == 2 ? (
//                 <input type="file"/> //Notes
//               ) : (
//                 <img
//                   src={previewSource}
//                   alt="preview"
//                   className="w-full rounded-md object-cover"
//                 />
//               )
//             ) : (
//               <video
//                 src={previewSource}
//                 controls
//                 className="w-full rounded-md"
//               />
//             )}

//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={clearFile}
//                 className="mt-3 text-sm text-[#999DAA] underline"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           /* -------- UPLOAD UI -------- */
//           <div
//             {...getRootProps()}
//             className="flex flex-col items-center gap-3 p-6 cursor-pointer"
//           >
//             <input {...getInputProps()} />

//             <div className="grid h-14 w-14 place-items-center rounded-full bg-[#161D29]">
//               <FiUploadCloud className="text-2xl text-yellow-400" />
//             </div>

//             <p className="text-center text-sm text-[#999DAA]">
//               Drag & drop a {!video ? "image" : "video"}, or{" "}
//               <span className="font-semibold text-[#9E8006]">browse</span>
//             </p>

//             {!video && (
//               <ul className="flex gap-6 text-xs text-gray-400">
//                 <li>Aspect ratio 16:9</li>
//                 <li>Recommended 1024×576</li>
//               </ul>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ERROR */}
//       {errors[name] && (
//         <span className="text-xs text-red-500">{label} is required</span>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  type , // "image" | "video" | "document"
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  );

  /* ---------------- DROP HANDLER ---------------- */
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setSelectedFile(file);

    // VIDEO
    if (type === "video") {
      const objectURL = URL.createObjectURL(file);
      setPreviewSource(objectURL);
    }

    // IMAGE
    else if (type === "image") {
      previewImage(file);
    }

    // DOCUMENT (PDF, DOC)
    else {
      setPreviewSource(file.name);
    }
  };

  /* ---------------- DROPZONE ---------------- */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept:
      type === "video"
        ? { "video/*": [".mp4"] }
        : type === "image"
        ? { "image/*": [".jpg", ".jpeg", ".png"] }
        : {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              [".docx"],
          },
    multiple: false,
    onDrop,
  });

  /* ---------------- IMAGE PREVIEW ---------------- */
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  /* ---------------- REGISTER FIELD ---------------- */
  useEffect(() => {
    register(name, {
      required: !editData && !viewData,
    });
  }, [register, name, editData, viewData]);

  /* ---------------- SET FILE TO FORM ---------------- */
  useEffect(() => {
    if (selectedFile) {
      setValue(name, selectedFile, { shouldValidate: true });
    }
  }, [selectedFile, setValue, name]);

  /* ---------------- EDIT MODE ---------------- */
  useEffect(() => {
    if (editData || viewData) {
      setValue(name, "existing-file", { shouldValidate: false });
    }
  }, [editData, viewData, setValue, name]);

  /* ---------------- CLEANUP ---------------- */
  useEffect(() => {
    return () => {
      if (type === "video" && selectedFile && previewSource) {
        URL.revokeObjectURL(previewSource);
      }
    };
  }, [previewSource, type, selectedFile]);

  /* ---------------- CLEAR FILE ---------------- */
  const clearFile = () => {
    setSelectedFile(null);
    setPreviewSource("");
    setValue(name, null, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-2">
      {/* LABEL */}
      <label className="text-sm text-[#F1F2FF]">
        {label}{" "}
        {!editData && !viewData && (
          <sup className="text-red-400">*</sup>
        )}
      </label>

      {/* UPLOAD BOX */}
      <div
        className={`min-h-60 rounded-md border-2 border-dashed
        ${isDragActive ? "bg-[#424854]" : "bg-[#2C333F]"}
        flex items-center justify-center`}
      >
        {previewSource ? (
          <div className="w-full p-4">

            {/* IMAGE */}
            {type === "image" && (
              <img
                src={previewSource}
                alt="preview"
                className="w-full rounded-md object-cover"
              />
            )}

            {/* VIDEO */}
            {type === "video" && (
              <video
                src={previewSource}
                controls
                className="w-full rounded-md"
              />
            )}

            {/* DOCUMENT */}
            {type === "document" && (
              <div className="p-4 bg-[#161D29] rounded-md text-white">
                📄 {previewSource}
              </div>
            )}

            {/* CANCEL */}
            {!viewData && (
              <button
                type="button"
                onClick={clearFile}
                className="mt-3 text-sm text-[#999DAA] underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          /* -------- DROPZONE -------- */
          <div
            {...getRootProps()}
            className="flex flex-col items-center gap-3 p-6 cursor-pointer"
          >
            <input {...getInputProps()} />

            <div className="grid h-14 w-14 place-items-center rounded-full bg-[#161D29]">
              <FiUploadCloud className="text-2xl text-yellow-400" />
            </div>

            <p className="text-center text-sm text-[#999DAA]">
              Drag & drop a{" "}
              {type === "image"
                ? "image"
                : type === "video"
                ? "video"
                : "document"}{" "}
              or{" "}
              <span className="font-semibold text-[#9E8006]">
                browse
              </span>
            </p>

            {type === "image" && (
              <ul className="flex gap-6 text-xs text-gray-400">
                <li>Aspect ratio 16:9</li>
                <li>Recommended 1024×576</li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* ERROR */}
      {errors[name] && (
        <span className="text-xs text-red-500">
          {label} is required
        </span>
      )}
    </div>
  );
}