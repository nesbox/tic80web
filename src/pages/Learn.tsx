
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkSlug from 'remark-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import helpContent from '../data/help.md?raw';

const Learn = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div>
      <h2 className="text-center">You can also learn about TIC-80 on the <a href="https://github.com/nesbox/TIC-80/wiki">Github Wiki</a>.</h2>
      <hr/>
      <div className="container mt-4 learn-content">
        <ReactMarkdown
          remarkPlugins={[remarkSlug as any]}
          rehypePlugins={[[rehypeAutolinkHeadings as any, {
            behavior: 'wrap'
          }]]}
          components={{
            code: ({ node, className, children, ...props }: any) => {
              return (
                <code
                  className={className}
                  style={{
                    color: '#e83e8c',
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }
          }}
        >
          {helpContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Learn;
