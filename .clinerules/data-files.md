## Brief overview
Project-specific guidelines for handling large data files in the tic80web project, particularly JSON data files that contain game and user information.

## Data file access
- Avoid reading users.json, games.json and texts.json files directly as they are large and contain extensive data
- Use grep search tools or other analysis utilities to examine file structure or extract specific information when needed
- Prefer querying data through the application's data context rather than direct file access during development

## Analysis approach
- When investigating data structure, use search_files tool with specific regex patterns instead of full file reads
- For understanding data schemas, reference the TypeScript type definitions in src/types/index.ts first
- Only load data files directly if absolutely necessary for debugging or when no other analysis method is available
