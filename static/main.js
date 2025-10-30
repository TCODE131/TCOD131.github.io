// static/main.js
let pyodideReady = null;
let editor = null;
let currentProblem = null;

async function initPyodide() {
    if (!pyodideReady) {
        pyodideReady = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
        });
    }
    return pyodideReady;
}

function loadProblemList() {
    const list = document.getElementById("problemList");
    list.innerHTML = "";
    PROBLEMS.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = p.title;
        li.onclick = () => selectProblem(p.id);
        list.appendChild(li);
    });
}

function selectProblem(id) {
    const p = PROBLEMS.find((x) => x.id === id);
    currentProblem = p;
    document.getElementById("title").textContent = p.title;
    document.getElementById("description").textContent = p.description;
    editor.setValue(p.starter);
}

async function runPython(code, append = "") {
    const pyodide = await initPyodide();
    const wrapped = `${code}\n${append}`;
    try {
        const result = await pyodide.runPythonAsync(wrapped);
        return { ok: true, output: result };
    } catch (e) {
        return { ok: false, output: e.message || String(e) };
    }
}

function buildGrader(problem) {
    // 將 JS 測資轉為 Python 可執行字面值
    const toPy = (v) =>
        Array.isArray(v) ? "[" + v.map(toPy).join(",") + "]" : JSON.stringify(v);

    return (
        "cases = " +
        JSON.stringify(problem.tests) +
        "\npass_cnt = 0\nfor c in cases:\n" +
        `    try:\n        got = ${problem.fnName}(*c['args'])\n` +
        "        if got == c['expect']:\n            pass_cnt += 1\n" +
        "    except Exception as e:\n        print('error:', e)\n" +
        "print(f'通過 {pass_cnt} / {len(cases)} 測試')"
    );
}

async function onRun() {
    const code = editor.getValue();
    const res = await runPython(code);
    document.getElementById("console").textContent = res.output || "(無輸出)";
}

async function onSubmit() {
    if (!currentProblem) return;
    const code = editor.getValue();
    const grader = buildGrader(currentProblem);
    const res = await runPython(code, grader);
    document.getElementById("console").textContent = res.output;
}

// ====== 建立 Monaco Editor（關鍵：tabCompletion 設定） ======
window.require(["vs/editor/editor.main"], function() {
    editor = monaco.editor.create(document.getElementById("editor"), {
        value: "# 請從左側選擇題目",
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: 14,

        // ★ 讓 Tab 行為：有建議就補完、沒建議就縮排
        tabCompletion: "on",
        quickSuggestions: { other: true, comments: false, strings: true },
        suggestOnTriggerCharacters: true,
        snippetSuggestions: "top",
        acceptSuggestionOnEnter: "on",
        wordBasedSuggestions: "currentDocument",

        // 縮排相關
        insertSpaces: true,
        detectIndentation: false,
        tabSize: 4,
        autoIndent: "full",

        parameterHints: { enabled: true },
    });

    // 掛上自動完成/片段/提示（這裡不再攔截 Tab）
    if (typeof setupAutocomplete === "function") {
        setupAutocomplete(monaco, editor);
    }
});

// 綁定按鈕
document.getElementById("runBtn").onclick = onRun;
document.getElementById("submitBtn").onclick = onSubmit;

// 啟動
loadProblemList();
initPyodide();