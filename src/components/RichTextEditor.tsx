
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Quote,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '', placeholder: string = '') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newValue = value.substring(0, start) + before + textToInsert + after + value.substring(end);
    onChange(newValue);
    
    // Set cursor position after insertion
    setTimeout(() => {
      if (textareaRef.current) {
        const newPosition = start + before.length + textToInsert.length + after.length;
        textareaRef.current.setSelectionRange(newPosition, newPosition);
        textareaRef.current.focus();
      }
    }, 0);
  };

  const uploadImage = async () => {
    if (!imageFile) return;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `blog-content-${Date.now()}-${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, imageFile);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      
      insertText(`![Image](${publicUrl})`);
      setShowImageUpload(false);
      setImageFile(null);
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      const text = linkText || linkUrl;
      insertText(`[${text}](${linkUrl})`);
      setShowLinkInput(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('**', '**', 'bold text')}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('*', '*', 'italic text')}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('<u>', '</u>', 'underlined text')}
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('# ', '', 'Heading 1')}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('## ', '', 'Heading 2')}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('### ', '', 'Heading 3')}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('- ', '', 'list item')}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('1. ', '', 'list item')}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('> ', '', 'quote text')}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowLinkInput(true)}
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowImageUpload(true)}
          title="Insert Image"
        >
          <Image className="w-4 h-4" />
        </Button>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="border-b p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="link-text" className="text-xs">Link Text</Label>
              <Input
                id="link-text"
                placeholder="Link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="link-url" className="text-xs">URL</Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={insertLink}>
              Insert Link
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowLinkInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Image Upload */}
      {showImageUpload && (
        <div className="border-b p-3 space-y-2">
          <Label htmlFor="image-upload" className="text-xs">Upload Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <div className="flex gap-2">
            <Button 
              type="button" 
              size="sm" 
              onClick={uploadImage}
              disabled={!imageFile || uploading}
            >
              {uploading ? 'Uploading...' : 'Insert Image'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => setShowImageUpload(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Text Area */}
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] border-0 rounded-none resize-none focus-visible:ring-0"
      />
    </div>
  );
};

export default RichTextEditor;
