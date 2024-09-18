'use client'

import React, { useState, useRef } from 'react';
import { X, Upload, File, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface FileInfo {
  name: string
  type: string
}

export function DropzoneInputPrompt() {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [inputText, setInputText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.types.includes('Files')) {
      setIsDraggingFile(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingFile(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingFile(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
    }
  }

  const addFiles = (newFiles: File[]) => {
    const newFileInfos = newFiles.map(file => ({ name: file.name, type: file.type }))
    setFiles(prevFiles => [...prevFiles, ...newFileInfos])
  }

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log('Submitted text:', inputText)
    console.log('Submitted files:', files)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="w-full">
      <Card
        className={`relative rounded-lg p-4 transition-colors ${
          isDraggingFile 
            ? 'border-2 border-dashed border-[#3F749E] bg-[#3F749E]/10' 
            : ' '
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          className="w-full h-32 mb-4 p-2 resize-none border-none focus:ring-0"
          aria-label="Message input"
        />
        <div className="max-h-40 overflow-y-auto mb-4">
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <Card key={index} className="flex items-center rounded-md p-2">
                <File className="w-4 h-4 mr-2" />
                <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              multiple
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mr-2"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add Files
            </Button>
          </div>
          <Button onClick={handleSubmit}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
        {isDraggingFile && (
          <div className="absolute inset-0 bg-[#3F749E]/10 rounded-lg flex items-center justify-center">
            <p className="text-[#3F749E] font-semibold">Drop files here</p>
          </div>
        )}
      </Card>
    </div>
  )
}
