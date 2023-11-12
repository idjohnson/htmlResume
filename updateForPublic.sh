#!/bin/bash
# For Private

subfolders=("contacts" "education" "experience" "extras")

for folder in "${subfolders[@]}"; do
    # Find all JSON files in the specified subfolder
    find "$folder" -type f -name '*.json' -print0 |
    while IFS= read -r -d '' file; do
        # Check if the file contains the key "tag" with the value "onlyprivate"
        if jq -e '.tag == "onlyprivate"' "$file" > /dev/null 2>&1; then
            # Update the key "enabled" to "true"
            jq '.enabled = "false"' "$file" > tmpfile && mv tmpfile "$file"
            echo "Updated $file"
        fi
    done

    find "$folder" -type f -name '*.json' -print0 |
    while IFS= read -r -d '' file; do
        # Check if the file contains the key "tag" with the value "onlyprivate"
        if jq -e '.tag == "onlypublic"' "$file" > /dev/null 2>&1; then
            # Update the key "enabled" to "false"
            jq '.enabled = "true"' "$file" > tmpfile && mv tmpfile "$file"
            echo "Updated $file"
        fi
    done
done