"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Folder, FileText, Image as ImageIcon, Video, Download, Trash2, MoreVertical, Search, UploadCloud, FolderPlus, Filter } from 'lucide-react';
import React, { useState, useMemo, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'image' | 'video';
  size?: string;
  lastModified: string;
  extension?: string; // Added for filtering
}

const mockFiles: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder', lastModified: '2023-10-26' },
  { id: '2', name: 'Photos', type: 'folder', lastModified: '2023-10-25' },
  { id: '3', name: 'report.pdf', type: 'file', size: '1.2MB', lastModified: '2023-10-24', extension: 'pdf' },
  { id: '4', name: 'vacation.jpg', type: 'image', size: '3.5MB', lastModified: '2023-10-23', extension: 'jpg' },
  { id: '5', name: 'tutorial.mp4', type: 'video', size: '50.MB', lastModified: '2023-10-22', extension: 'mp4' },
  { id: '6', name: 'archive.zip', type: 'file', size: '12.7MB', lastModified: '2023-10-21', extension: 'zip' },
  { id: '7', name: 'Spreadsheet.xlsx', type: 'file', size: '350KB', lastModified: '2023-10-20', extension: 'xlsx' },
  { id: '8', name: 'backup.tar.gz', type: 'file', size: '200MB', lastModified: '2023-10-19', extension: 'gz' },
  { id: '9', name: 'script.js', type: 'file', size: '5KB', lastModified: '2023-10-18', extension: 'js' },
  { id: '10', name: 'logo.png', type: 'image', size: '150KB', lastModified: '2023-10-17', extension: 'png' },
];

const FileIcon = React.memo(({ type }: { type: FileItem['type'] }) => {
  switch (type) {
    case 'folder': return <Folder className="h-5 w-5 text-primary" />;
    case 'image': return <ImageIcon className="h-5 w-5 text-green-500" />;
    case 'video': return <Video className="h-5 w-5 text-purple-500" />;
    default: return <FileText className="h-5 w-5 text-gray-500" />;
  }
});
FileIcon.displayName = 'FileIcon';

export function FileBrowserComponent() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [extensionFilter, setExtensionFilter] = useState<string>('all');
  const { toast } = useToast();

  const availableExtensions = useMemo(() => {
    const extensions = new Set(files.map(f => f.extension).filter(Boolean));
    return ['all', ...Array.from(extensions)] as string[];
  }, [files]);

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearchTerm = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesExtension = extensionFilter === 'all' || file.extension === extensionFilter || file.type === 'folder'; // Always show folders
      return matchesSearchTerm && matchesExtension;
    });
  }, [files, searchTerm, extensionFilter]);

  const handleSelectAll = useCallback((checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedFiles(new Set(filteredFiles.map(f => f.id)));
    } else {
      setSelectedFiles(new Set());
    }
  }, [filteredFiles]);

  const handleSelectFile = useCallback((fileId: string, checked: boolean | 'indeterminate') => {
    setSelectedFiles(prevSelectedFiles => {
      const newSelectedFiles = new Set(prevSelectedFiles);
      if (checked === true) {
        newSelectedFiles.add(fileId);
      } else {
        newSelectedFiles.delete(fileId);
      }
      return newSelectedFiles;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    const numDeleted = selectedFiles.size;
    setFiles(prevFiles => prevFiles.filter(f => !selectedFiles.has(f.id)));
    setSelectedFiles(new Set());
    toast({ 
      title: "Files Deleted", 
      description: `${numDeleted} item(s) have been notionally deleted. This action would be logged to Firestore.` 
    });
    // TODO: Log this action to Firestore: { actor: 'Controller', action: 'BATCH_FILE_DELETE', details: `${numDeleted} files`, status: 'success', timestamp: new Date().toISOString() }
  }, [selectedFiles, toast]);
  
  const handleDownload = useCallback((file: FileItem) => {
     toast({ 
       title: "Download Started", 
       description: `Notionally downloading ${file.name}. This action would be logged to Firestore.` 
      });
     // TODO: Log this action to Firestore: { actor: 'Controller', action: 'FILE_DOWNLOAD', details: file.name, status: 'pending', timestamp: new Date().toISOString() }
     // Actual download logic would go here. On completion, log status: 'success' or 'failure'.
  }, [toast]);

  const handleDelete = useCallback((file: FileItem) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
    toast({ 
      title: "File Deleted", 
      description: `${file.name} has been notionally deleted. This action would be logged to Firestore.` 
    });
    // TODO: Log this action to Firestore: { actor: 'Controller', action: 'FILE_DELETE', details: file.name, status: 'success', timestamp: new Date().toISOString() }
  }, [toast]);

  const isAllSelected = selectedFiles.size === filteredFiles.length && filteredFiles.length > 0;
  const isIndeterminate = selectedFiles.size > 0 && selectedFiles.size < filteredFiles.length;


  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search files by name..." 
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={extensionFilter} onValueChange={setExtensionFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {availableExtensions.map(ext => (
              <SelectItem key={ext} value={ext}>
                {ext === 'all' ? 'All Types' : `*.${ext}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline"><UploadCloud className="mr-2 h-4 w-4" /> Upload</Button>
            <Button variant="outline"><FolderPlus className="mr-2 h-4 w-4" /> New Folder</Button>
        </div>
      </div>

      {selectedFiles.size > 0 && (
        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
          <span className="text-sm">{selectedFiles.size} item(s) selected</span>
          <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
          </Button>
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-24rem)] rounded-md border"> {/* Adjusted height slightly */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={isAllSelected ? true : isIndeterminate ? 'indeterminate' : false}
                  onCheckedChange={handleSelectAll}
                  disabled={filteredFiles.length === 0}
                />
              </TableHead>
              <TableHead className="w-[50px]">Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file) => (
              <TableRow key={file.id} data-state={selectedFiles.has(file.id) ? "selected" : ""}>
                <TableCell>
                  <Checkbox 
                    checked={selectedFiles.has(file.id)}
                    onCheckedChange={(checked) => handleSelectFile(file.id, checked)}
                  />
                </TableCell>
                <TableCell><FileIcon type={file.type} /></TableCell>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.size || '—'}</TableCell>
                <TableCell>{file.lastModified}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(file)}>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(file)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
             {filteredFiles.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No files found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
