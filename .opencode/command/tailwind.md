---
description: Recompile the Tailwind stylesheet into assets/css/tailwind.css
---

# Recompile Tailwind CSS

Recompile the Tailwind stylesheet from `_src/input.css`. On Windows, use the
standalone binary in the repo:

```bash
./tailwindcss.exe -i _src/input.css -o assets/css/tailwind.css --minify
```

On other platforms:

```bash
npx tailwindcss -i _src/input.css -o assets/css/tailwind.css --minify
```

The generated `assets/css/tailwind.css` is committed to the repo.
