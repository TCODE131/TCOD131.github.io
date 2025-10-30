require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });

require(['vs/editor/editor.main'], function() {
    window.editor = monaco.editor.create(document.getElementById('editor'), {
        value: '# 請選擇題目開始練習',
        language: 'python',
        theme: 'vs-dark',
        fontSize: 15,
        automaticLayout: true
    });

    setupAutocomplete(monaco, editor);
    loadProblemList();
});

// 題庫顯示
function loadProblemList() {
    const container = document.getElementById('problems');
    container.innerHTML = '';
    PROBLEMS.forEach((p, idx) => {
        const div = document.createElement('div');
        div.className = 'problem-item';
        div.textContent = `${String(idx + 1).padStart(4, '0')}. ${p.title}`;
        div.onclick = () => loadProblem(p);
        container.appendChild(div);
    });
}

// 載入題目
function loadProblem(p) {
    document.getElementById('problem-title').innerText = `${p.title}`;
    document.getElementById('problem-desc').innerText = p.description;
    editor.setValue(p.starter);
    window.currentProblem = p;
}

// 執行
document.getElementById('run').onclick = () => {
    document.getElementById('status').textContent = 'Running...';
    const code = editor.getValue();
    setTimeout(() => {
        document.getElementById('console').textContent =
            `▶️ 模擬執行中...\n---\n${code.slice(0, 150)}\n---\n✅ 程式執行結束`;
        document.getElementById('status').textContent = 'Idle';
    }, 600);
};

// 提交
document.getElementById('submit').onclick = () => {
    if (!window.currentProblem) {
        alert('請先選擇題目！');
        return;
    }
    document.getElementById('status').textContent = 'Evaluating...';
    setTimeout(() => {
        document.getElementById('console').textContent =
            `🏁 正在測試 ${window.currentProblem.title}\n✅ 通過 3 / 4 測資\n⚠️ 有 1 項失敗 (僅示意)`;
        document.getElementById('status').textContent = 'Idle';
    }, 800);
};