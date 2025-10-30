#!/usr/bin/env python3
import html.parser
import sys

class HTMLValidator(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.tag_stack = []
        self.errors = []
        self.line_num = 1
        self.self_closing_tags = {
            'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
            'link', 'meta', 'param', 'source', 'track', 'wbr'
        }
    
    def handle_starttag(self, tag, attrs):
        if tag not in self.self_closing_tags:
            self.tag_stack.append((tag, self.line_num))
    
    def handle_endtag(self, tag):
        if tag in self.self_closing_tags:
            return
        
        if not self.tag_stack:
            self.errors.append(f"Line {self.line_num}: Closing tag </{tag}> without opening tag")
            return
        
        # Check if the tag matches the most recent opening tag
        if self.tag_stack and self.tag_stack[-1][0] == tag:
            self.tag_stack.pop()
        else:
            # Try to find the matching opening tag
            found = False
            for i in range(len(self.tag_stack) - 1, -1, -1):
                if self.tag_stack[i][0] == tag:
                    found = True
                    # Report all unclosed tags
                    for j in range(len(self.tag_stack) - 1, i, -1):
                        self.errors.append(f"Line {self.tag_stack[j][1]}: Unclosed tag <{self.tag_stack[j][0]}>")
                    # Remove the matched tag and all tags after it
                    self.tag_stack = self.tag_stack[:i]
                    break
            
            if not found:
                self.errors.append(f"Line {self.line_num}: Closing tag </{tag}> without matching opening tag")
    
    def handle_data(self, data):
        self.line_num += data.count('\n')
    
    def feed(self, data):
        # Track line numbers
        lines = data.split('\n')
        for i, line in enumerate(lines):
            try:
                super().feed(line + '\n')
            except Exception as e:
                self.errors.append(f"Line {i+1}: Parse error - {str(e)}")
    
    def get_results(self):
        # Check for any unclosed tags
        for tag, line in self.tag_stack:
            self.errors.append(f"Line {line}: Unclosed tag <{tag}>")
        
        return self.errors

# Read the HTML file
with open('/Users/matechsgarage/Code/effect-website/landing/public/design-guidelines/components.html', 'r') as f:
    html_content = f.read()

# Validate
validator = HTMLValidator()
validator.feed(html_content)
errors = validator.get_results()

if errors:
    print("HTML Validation Errors Found:")
    for error in errors:
        print(f"  - {error}")
    sys.exit(1)
else:
    print("HTML is valid! All tags are properly opened and closed.")
    
# Additional structure analysis
print("\nHTML Structure Summary:")
print(f"- Total lines: {html_content.count(chr(10)) + 1}")
print(f"- Total sections: {html_content.count('<section')}")
print(f"- Total divs: {html_content.count('<div')}")
print(f"- Closing divs: {html_content.count('</div>')}")
print(f"- Total unclosed tags at end: {len(validator.tag_stack)}")