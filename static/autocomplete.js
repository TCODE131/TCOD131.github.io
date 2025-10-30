// static/autocomplete.js
function setupAutocomplete(monaco, editor) {
    // ===== 1) 內建函式與關鍵字的建議 =====
    const pythonItems = [
        { label: "print", snippet: "print(${1:object})", doc: "輸出資料到控制台" },
        { label: "len", snippet: "len(${1:iterable})", doc: "回傳可迭代物件的長度" },
        { label: "range", snippet: "range(${1:start}, ${2:stop})", doc: "建立數值範圍迭代器" },
        { label: "enumerate", snippet: "enumerate(${1:iterable})", doc: "同時取得索引與值" },
        { label: "sum", snippet: "sum(${1:iterable})", doc: "對所有元素求和" },
        { label: "def", snippet: "def ${1:func_name}(${2:args}):\n\t${3:pass}", doc: "函式定義" },
        { label: "class", snippet: "class ${1:ClassName}:\n\tdef __init__(self, ${2:args}):\n\t\t${3:pass}", doc: "類別定義" },
        { label: "for", snippet: "for ${1:i} in ${2:range()}:\n\t${3:pass}", doc: "for 迴圈" },
        { label: "if", snippet: "if ${1:condition}:\n\t${2:pass}", doc: "if 條件判斷" },
        { label: "while", snippet: "while ${1:condition}:\n\t${2:pass}", doc: "while 迴圈" },
    ];

    monaco.languages.registerCompletionItemProvider("python", {
        triggerCharacters: [".", " ", "p", "d", "f", "c", "r", "w", "i", "l", "s"],
        provideCompletionItems: () => {
            const suggestions = pythonItems.map((item) => ({
                label: item.label,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: item.snippet,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: "Python 內建 / 模板",
                documentation: {
                    value: `**${item.label}**\n\n${item.doc}\n\n---\n\`\`\`python\n${item.snippet}\n\`\`\``,
                },
            }));
            return { suggestions };
        },
    });

    // ===== 2) 額外 Snippet（try/except、main） =====
    monaco.languages.registerCompletionItemProvider("python", {
        provideCompletionItems: () => ({
            suggestions: [{
                    label: "try/except",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: "try:\n\t${1:pass}\nexcept ${2:Exception} as e:\n\t${3:print(e)}",
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "例外處理模板",
                },
                {
                    label: "main",
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'if __name__ == "__main__":\n\t${1:main()}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: "程式進入點",
                },
            ],
        }),
    });

    // ===== 3) 簡單的即時警告（可選） =====
    editor.onDidChangeModelContent(() => {
        const code = editor.getValue();
        const model = editor.getModel();
        const markers = [];

        if (/print\([^)]*$/.test(code)) {
            markers.push({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: 1,
                endColumn: 1,
                message: "⚠ print() 可能缺少右括號 )",
                severity: monaco.MarkerSeverity.Warning,
            });
        }

        if (/def\s+\w+\([^)]*$/.test(code)) {
            markers.push({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: 1,
                endColumn: 1,
                message: "ℹ 函式定義可能未閉合 ) 或缺少 :",
                severity: monaco.MarkerSeverity.Info,
            });
        }

        monaco.editor.setModelMarkers(model, "python", markers);
    });

    // ===== 4) 反縮排（Shift+Tab）— 不動到 Tab 本身 =====
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Tab, () => {
        editor.trigger("keyboard", "outdent");
    });
}