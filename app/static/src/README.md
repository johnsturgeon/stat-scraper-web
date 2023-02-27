# static/src directory

This is where the tailwind css directives will go
see: https://testdriven.io/blog/flask-htmx-tailwind/ for tips

Generate the minified css by doing:
```bash
cd /app
npx tailwindcss -i ./static/src/main.css -o ./static/dist/main.
```
