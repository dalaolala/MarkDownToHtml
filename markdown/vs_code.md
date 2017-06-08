# VSCode 配置
## 键盘快捷键
``` json
[
    { "key": "ctrl+'", "command": "workbench.action.tasks.terminate" },
    { "key":"ctrl+b", "command": "workbench.action.tasks.build"},
    { "key":"ctrl+shift+b", "command": "workbench.action.toggleSidebarVisibility"}
]
```
## 执行python
``` json
task.json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "0.1.0",
    "command": "E:/MyProgram/python/python.exe",
    "isShellCommand": true,
    "args": [
        "${file}"
    ],
    "showOutput": "always",
    "options": {
        "env": {
            "PYTHONIOENCODING": "UTF-8"
        }
    }
}
```