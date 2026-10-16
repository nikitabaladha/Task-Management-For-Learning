# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<!-- Commands -->

npm create vite@latest . -- --template react
Need to install the following packages:
create-vite@9.1.2
Ok to proceed? (y) y

> npx
> "create-vite" . --template react
│
◇  Current directory is not empty. Please choose how to proceed:
│  Ignore files and continue
│
◇  Package name:
│  task-management-application-frontend
│
◇  Which linter to use?
│  ESLint
│
◇  Install with npm and start now?
│  Yes
│
◇  Scaffolding project in /Users/nikita/Desktop/Task_Management_Application/Frontend/Task_Management_Application_Frontend...
│
◇  Installing dependencies with npm...

added 159 packages, and audited 160 packages in 20s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
│
◇  Starting dev server...

> task-management-application-frontend@0.0.0 dev
> vite


  VITE v8.2.0  ready in 537 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

  <!--  -->

npm install

npm install react-router-dom axios react-toastify react-icons

mkdir -p src/api src/components src/context src/layouts src/pages/Auth src/pages/Admin src/pages/User src/routes

find src -maxdepth 3 -type d

rm -rf src/assets

create .env
