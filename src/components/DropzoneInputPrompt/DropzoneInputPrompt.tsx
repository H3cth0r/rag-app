'use client'

import React, { useState, useRef } from 'react';
import { X, Upload, File, Send, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast.ts";

interface ItemInfo {
  type: 'repo' | 'file';
  object: string | File;
  name: string;
}

export function DropzoneInputPrompt() {
  const [items, setItems] = useState<ItemInfo[]>([])
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [inputText, setInputText] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

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
    const duplicates: string[] = []
    const newItems = newFiles.filter(file => {
      const isDuplicate = items.some(item => item.name === file.name)
      if (isDuplicate) {
        duplicates.push(file.name)
      }
      return !isDuplicate
    }).map(file => ({ type: 'file' as const, object: file, name: file.name }))

    if (duplicates.length > 0) {
      toast({
        title: "Duplicate files detected",
        description: `The following files were not added: ${duplicates.join(', ')}`,
        variant: "destructive",
      })
    }

    setItems(prevItems => [...prevItems, ...newItems])
  }

  const addRepoUrl = () => {
    if (repoUrl.trim()) {
      const isDuplicate = items.some(item => item.name === repoUrl)
      if (isDuplicate) {
        toast({
          title: "Duplicate repo URL",
          description: "This repo URL has already been added.",
          variant: "destructive",
        })
      } else {
        setItems(prevItems => [...prevItems, { type: 'repo', object: repoUrl, name: repoUrl }])
        setRepoUrl('')
      }
    }
  }

  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log('Submitted text:', inputText)
    console.log('Submitted items:', items)
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
            {items.map((item, index) => (
              <Card key={index} className="flex items-center rounded-md p-2">
                {item.type === 'file' ? (
                  <File className="w-4 h-4 mr-2" />
                ) : (
                  <Link className="w-4 h-4 mr-2" />
                )}
                <span className="text-sm truncate max-w-[150px]">{item.name}</span>
                <button
                  onClick={() => removeItem(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label={`Remove ${item.name}`}
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
          <div className="flex-grow mx-4">
            <div className="flex">
              <Input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="Repo URL"
                className="mr-2"
              />
              <Button onClick={addRepoUrl}>Add</Button>
            </div>
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
