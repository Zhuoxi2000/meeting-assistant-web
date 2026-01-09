"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface CodeBlockWithHighlightProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  maxHeight?: number;
  className?: string;
}

// Simple syntax highlighting for common languages
function highlightCode(code: string, language: string): string {
  // Keywords for different languages
  const keywords: Record<string, string[]> = {
    python: ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'import', 'from', 'class', 'try', 'except', 'with', 'as', 'lambda', 'and', 'or', 'not', 'True', 'False', 'None'],
    javascript: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'this', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw', 'true', 'false', 'null', 'undefined'],
    typescript: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'this', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw', 'true', 'false', 'null', 'undefined', 'interface', 'type', 'enum'],
    java: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final', 'void', 'int', 'String', 'boolean', 'return', 'if', 'else', 'for', 'while', 'new', 'this', 'try', 'catch', 'throw', 'true', 'false', 'null'],
    cpp: ['int', 'void', 'char', 'float', 'double', 'bool', 'return', 'if', 'else', 'for', 'while', 'class', 'public', 'private', 'protected', 'virtual', 'const', 'static', 'new', 'delete', 'true', 'false', 'nullptr', 'include'],
  };

  const langKeywords = keywords[language] || keywords.python;
  let result = code;

  // Escape HTML
  result = result
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight strings (single and double quotes)
  result = result.replace(
    /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g,
    '<span class="text-[#00FF88]">$&</span>'
  );

  // Highlight comments
  result = result.replace(
    /(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    '<span class="text-[#94A3C8]/60 italic">$&</span>'
  );

  // Highlight numbers
  result = result.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-[#FF6B35]">$1</span>'
  );

  // Highlight keywords
  langKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    result = result.replace(
      regex,
      '<span class="text-[#00D4FF] font-medium">$1</span>'
    );
  });

  // Highlight function calls
  result = result.replace(
    /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
    '<span class="text-[#A855F7]">$1</span>('
  );

  return result;
}

export default function CodeBlockWithHighlight({
  code,
  language = "python",
  title,
  showLineNumbers = true,
  maxHeight = 300,
  className,
}: CodeBlockWithHighlightProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const lines = code.split('\n');
  const needsExpansion = lines.length > 15;
  const displayedCode = isExpanded || !needsExpansion ? code : lines.slice(0, 12).join('\n') + '\n...';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const highlightedCode = highlightCode(displayedCode, language);
  const displayedLines = displayedCode.split('\n');

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden glass-card",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0f1a]/80 border-b border-[#00D4FF]/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          </div>
          {title && (
            <span className="text-xs text-[#94A3C8]">{title}</span>
          )}
          <span className="text-[10px] text-[#00D4FF]/60 uppercase tracking-wider">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 text-[#94A3C8] hover:text-[#00D4FF] transition-all text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div
        className="overflow-auto scrollbar-thin scrollbar-thumb-[#00D4FF]/20 scrollbar-track-transparent"
        style={{ maxHeight: isExpanded ? 'none' : maxHeight }}
      >
        <div className="p-4 font-mono text-sm leading-relaxed">
          <table className="w-full border-collapse">
            <tbody>
              {displayedLines.map((line, index) => (
                <tr key={index} className="hover:bg-[#00D4FF]/5">
                  {showLineNumbers && (
                    <td className="w-10 pr-4 text-right text-[#94A3C8]/40 select-none align-top">
                      {index + 1}
                    </td>
                  )}
                  <td className="whitespace-pre-wrap break-all">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightCode(line, language),
                      }}
                      className="text-[#F0F4FF]"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      {needsExpansion && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 flex items-center justify-center gap-1 text-xs text-[#94A3C8] hover:text-[#00D4FF] bg-[#0a0f1a]/50 border-t border-[#00D4FF]/10 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              收起代码
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              展开全部 ({lines.length} 行)
            </>
          )}
        </button>
      )}
    </div>
  );
}

// Inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-[#00D4FF]/10 text-[#00D4FF] text-sm font-mono">
      {children}
    </code>
  );
}

