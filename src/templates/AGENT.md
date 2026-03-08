# Agent Guidelines

## About This Project
This is a ServiceNow UI Builder component wrapper that bridges React 17 with the UI Framework.
The architecture has three layers — Gate, Bridge, and Developer Land. As an agent, you only
operate in Developer Land. The Gate and Bridge are immutable and handle all ServiceNow-specific
communication.

## ✅ Your Playground
You are allowed to work ONLY in these areas:

- `src/components/MyReactApp.js` and any child components you create inside `src/components/`
- `now-ui.json` — but ONLY the `actions` and `properties` arrays

## 🚫 Forbidden Files — Never Touch
These files are the immutable core of the architecture. Do not read, modify, or suggest changes to:

- `src/x-*/index.js` (The Gate)
- `src/x-*/ReactBridge.js` (The Bridge)
- Any file outside `src/components/` and `now-ui.json`

## 🚫 Forbidden Libraries
Do not install:
- Material UI (MUI)
- Chakra UI
- Ant Design
- Bootstrap

## ✅ Approved Stack
- React 17 (already installed)
- Tailwind CSS utility classes
- Chart.js / react-chartjs-2
- Native fetch or axios

## ⚠️ Important Limitations
- This is React 17 — no `useTransition`, no `createRoot`
- After adding properties or events to `now-ui.json`, the user must manually wire them up in `ReactBridge.js` and `index.js`
- Shadow DOM is active — global CSS will not work

## ⚠️ JSX Pragma Required
Every new React component file MUST start with these two lines:
```js
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
```
This is mandatory — without it, JSX will not compile correctly in this environment.


## Adding Events
To add a new event, append to the `actions` array in `now-ui.json`:
```json
{
  "name": "MY_EVENT",
  "label": "On My Event",
  "description": "Fires when...",
  "payload": [
    { "name": "myParam", "label": "My Param" }
  ]
}
```
Then dispatch it from React via the `onDispatchEventClick` prop passed down from the Bridge.

## Adding Properties
To add a new property, append to the `properties` array in `now-ui.json`:
```json
{
  "name": "myProperty",
  "label": "My Property",
  "description": "...",
  "fieldType": "string",
  "required": false
}
```
The property will be available as a prop in `MyReactApp.js` once the user wires it up in `ReactBridge.js`.