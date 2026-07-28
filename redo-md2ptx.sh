#!/bin/bash

find . -name '*.md' -print0 |
while IFS= read -r -d '' file; do
    echo "=== $file ==="
    /workspaces/webfundamentals/md2ptx "$file"
done
exit

# equivalently
#!/bin/bash

find source/ -name '*.md' -exec /workspaces/webfundamentals/md2ptx {} \;