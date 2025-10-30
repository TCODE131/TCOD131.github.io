function setupAutocomplete(monaco, editor) {
    // 1️⃣ 註冊自動補全項目
    monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: () => {
            const suggestions = [{
                    label: 'print',
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: 'print(${1:msg})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Python 輸出函式'
                },
                {
                    label: 'for loop',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'for ${1:i} in range(${2:10}):\n\tprint(${1:i})',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '基本 for 迴圈'
                },
                {
                    label: 'if main',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'if __name__ == "__main__":\n\t${1:pass}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: '主程式入口'
                }
            ];
            return { suggestions };
        }
    });

    // 2️⃣ 讓 Tab 鍵做「縮排或補全」
    editor.addCommand(monaco.KeyCode.Tab, () => {
        const model = editor.getModel();
        const selection = editor.getSelection();

        // 若有可補全的建議，就開啟建議視窗
        editor.trigger('keyboard', 'editor.action.triggerSuggest', {});

        // 若已開建議清單，則讓 Tab 選中建議
        const suggestController = editor.getContribution('editor.contrib.suggestController');
        if (suggestController.model.state === 2) { // "Open"
            suggestController.acceptSelectedSuggestion();
            return;
        }

        // 否則執行縮排（4空白）
        editor.executeEdits('', [{
            range: selection,
            text: '    ',
            forceMoveMarkers: true
        }]);
    });

    // 3️⃣ 偵測 print() 括號未關閉
    editor.onDidChangeModelContent(() => {
        const code = editor.getValue();
        if (/print\([^)]*$/.test(code)) {
            monaco.editor.setModelMarkers(editor.getModel(), 'python', [{
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: 1,
                endColumn: 5,
                message: '⚠️ print() 括號可能未閉合',
                severity: monaco.MarkerSeverity.Warning
            }]);
        } else {
            monaco.editor.setModelMarkers(editor.getModel(), 'python', []);
        }
    });

    // 4️⃣ 其他基本設定（確保 Tab 不被瀏覽器吃掉）
    editor.updateOptions({
        tabSize: 4,
        insertSpaces: true,
        detectIndentation: false,
        quickSuggestions: true,
        suggestOnTriggerCharacters: true
    });
}