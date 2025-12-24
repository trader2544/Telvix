
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Code,
  Strikethrough
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageWidth, setImageWidth] = useState(100);
  const [imageAlignment, setImageAlignment] = useState('center');
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

  const handleImageFileChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
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
      
      // Create image with styling
      const alignStyle = imageAlignment === 'left' ? 'float: left; margin-right: 1rem;' 
        : imageAlignment === 'right' ? 'float: right; margin-left: 1rem;'
        : 'margin: 0 auto; display: block;';
      
      const imageHtml = `<div style="text-align: ${imageAlignment};">
  <img src="${publicUrl}" alt="Blog Image" style="width: ${imageWidth}%; max-width: 100%; ${alignStyle}" />
</div>`;
      
      insertText(imageHtml);
      setShowImageUpload(false);
      setImageFile(null);
      setImagePreview(null);
      setImageWidth(100);
      setImageAlignment('center');
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

  const insertAlignment = (alignment: string) => {
    const alignmentHtml = `<div style="text-align: ${alignment};">`;
    insertText(alignmentHtml, '</div>', 'Your text here');
  };

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        {/* Text formatting */}
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

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('~~', '~~', 'strikethrough text')}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('`', '`', 'code')}
          title="Inline Code"
        >
          <Code className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Headings */}
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

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Alignment */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertAlignment('left')}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertAlignment('center')}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertAlignment('right')}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertAlignment('justify')}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Lists */}
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

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertText('\n---\n', '', '')}
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Media */}
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
        <div className="border-b p-3 space-y-2 bg-muted/30">
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

      {/* Image Upload with Resize Controls */}
      {showImageUpload && (
        <div className="border-b p-4 space-y-4 bg-muted/30">
          <div className="space-y-2">
            <Label htmlFor="image-upload" className="text-sm font-medium">Upload Image</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageFileChange(e.target.files?.[0] || null)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
            />
          </div>

          {imagePreview && (
            <div className="space-y-4">
              {/* Preview */}
              <div className="border rounded-lg p-4 bg-background">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <div style={{ textAlign: imageAlignment as 'left' | 'center' | 'right' }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ 
                      width: `${imageWidth}%`, 
                      maxWidth: '100%',
                      margin: imageAlignment === 'center' ? '0 auto' : undefined,
                      display: imageAlignment === 'center' ? 'block' : 'inline-block'
                    }} 
                    className="rounded"
                  />
                </div>
              </div>

              {/* Size Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Image Width: {imageWidth}%</Label>
                </div>
                <Slider
                  value={[imageWidth]}
                  onValueChange={(val) => setImageWidth(val[0])}
                  min={25}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Alignment Control */}
              <div className="space-y-2">
                <Label className="text-sm">Alignment</Label>
                <Select value={imageAlignment} onValueChange={setImageAlignment}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">
                      <span className="flex items-center gap-2">
                        <AlignLeft className="w-4 h-4" /> Left
                      </span>
                    </SelectItem>
                    <SelectItem value="center">
                      <span className="flex items-center gap-2">
                        <AlignCenter className="w-4 h-4" /> Center
                      </span>
                    </SelectItem>
                    <SelectItem value="right">
                      <span className="flex items-center gap-2">
                        <AlignRight className="w-4 h-4" /> Right
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

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
              onClick={() => {
                setShowImageUpload(false);
                setImageFile(null);
                setImagePreview(null);
                setImageWidth(100);
                setImageAlignment('center');
              }}
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

      {/* Formatting Help */}
      <div className="border-t p-2 text-xs text-muted-foreground bg-muted/20">
        <span className="font-medium">Tip:</span> Select text to apply formatting, or use HTML for advanced styling.
      </div>
    </div>
  );
};

export default RichTextEditor;