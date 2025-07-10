import { useState } from "react"
import useResolution from "@/hooks/useResolution"

type FileSelectProps = {
  onSelection: (file: File) => void
}

export default function FileSelect(props: FileSelectProps) {
  const { onSelection } = props

  const [uploadElemId] = useState(`file-upload-${Math.random().toString()}`)

  const resolution = useResolution()

  function onFileSelected(file: File) {
    if (!file) {
      return
    }
    // 跳过非图片文件
    const isImage = file.type.match("image.*")
    if (!isImage) {
      return
    }
    try {
      // 检查文件是否大于20MB
      if (file.size > 20 * 1024 * 1024) {
        throw new Error("文件过大，请选择小于20MB的图片")
      }
      onSelection(file)
    } catch (e) {
      // eslint-disable-next-line
      alert(`错误: ${(e as any).message}`)
    }
  }

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-50/50 backdrop-blur-sm">
      <label
        htmlFor={uploadElemId}
        className="flex flex-col items-center justify-center gap-4 p-12 bg-white border-2 border-dashed border-gray-300 rounded-xl shadow-lg hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer"
      >
        <div
          className="flex flex-col items-center justify-center gap-2"
          onDragOver={(ev) => {
            ev.stopPropagation()
            ev.preventDefault()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <input
            className="hidden"
            id={uploadElemId}
            name={uploadElemId}
            type="file"
            onChange={(ev) => {
              const file = ev.currentTarget.files?.[0]
              if (file) {
                onFileSelected(file)
              }
            }}
            accept="image/png, image/jpeg, image/webp"
          />
          <p className="text-lg font-medium text-gray-700">
            {resolution === "desktop"
              ? "点击或拖拽图片到此处"
              : "点击选择图片"}
          </p>
          <p className="text-sm text-gray-500">
            支持格式: PNG, JPEG, WEBP (最大20MB)
          </p>
        </div>
      </label>
    </div>
  )
}
