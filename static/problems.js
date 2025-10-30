// static/problems.js
// 題庫資料（共 10 題）
const PROBLEMS = [
    // 1) 兩數之和
    {
        id: 'two-sum',
        title: '0001. 兩數之和 (Two Sum)',
        description: '給定整數陣列 nums 與整數 target，回傳兩個索引使其相加等於 target。',
        fnName: 'two_sum',
        starter: `from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    # TODO: 使用雜湊表達到 O(n)
    # hint: 記錄值->索引
    pass`,
        tests: [
            { args: [
                    [2, 7, 11, 15], 9
                ], expect: [0, 1] },
            { args: [
                    [3, 2, 4], 6
                ], expect: [1, 2] },
            { args: [
                    [3, 3], 6
                ], expect: [0, 1] },
            { args: [
                    [-1, -2, -3, -4, -5], -8
                ], expect: [2, 4] }
        ]
    },

    // 2) 有效的括號
    {
        id: 'is-valid',
        title: '0020. 有效的括號 (Valid Parentheses)',
        description: '判斷字串 s 是否為有效括號序列。',
        fnName: 'is_valid',
        starter: `def is_valid(s: str) -> bool:
    # TODO: 使用 stack 配對右括號
    pass`,
        tests: [
            { args: ["()"], expect: true },
            { args: ["()[]{}"], expect: true },
            { args: ["(]"], expect: false },
            { args: ["([{}])"], expect: true },
            { args: ["([)]"], expect: false }
        ]
    },

    // 3) 最大子陣列和（Kadane）
    {
        id: 'max-subarray',
        title: '0053. 最大子陣列和 (Maximum Subarray)',
        description: '回傳連續子陣列的最大和。',
        fnName: 'max_subarray',
        starter: `from typing import List

def max_subarray(nums: List[int]) -> int:
    # TODO: Kadane 演算法
    pass`,
        tests: [
            { args: [
                    [-2, 1, -3, 4, -1, 2, 1, -5, 4]
                ], expect: 6 },
            { args: [
                    [1]
                ], expect: 1 },
            { args: [
                    [5, 4, -1, 7, 8]
                ], expect: 23 },
            { args: [
                    [-1, -2, -3]
                ], expect: -1 }
        ]
    },

    // 4) 爬樓梯（DP）
    {
        id: 'climb-stairs',
        title: '0070. 爬樓梯 (Climbing Stairs)',
        description: '每次可爬 1 或 2 階，求爬到第 n 階的不同方法數。',
        fnName: 'climb_stairs',
        starter: `def climb_stairs(n: int) -> int:
    # TODO: DP or 斐波那契
    pass`,
        tests: [
            { args: [2], expect: 2 },
            { args: [3], expect: 3 },
            { args: [5], expect: 8 },
            { args: [1], expect: 1 }
        ]
    },

    // 5) 驗證回文（只看英數，忽略大小寫）
    {
        id: 'valid-palindrome',
        title: '0125. 驗證回文 (Valid Palindrome)',
        description: '只考慮英數字元並忽略大小寫，判斷是否為回文。',
        fnName: 'is_palindrome',
        starter: `def is_palindrome(s: str) -> bool:
    # TODO: 雙指標 + isalnum() + lower()
    pass`,
        tests: [
            { args: ["A man, a plan, a canal: Panama"], expect: true },
            { args: ["race a car"], expect: false },
            { args: [" "], expect: true },
            { args: ["0P"], expect: false }
        ]
    },

    // 6) 旋轉陣列（回傳新陣列）
    {
        id: 'rotate-array',
        title: '0189. 旋轉陣列 (Rotate Array)',
        description: '將陣列向右旋轉 k 步，回傳旋轉後的新陣列（不要求原地）。',
        fnName: 'rotate_array',
        starter: `from typing import List

def rotate_array(nums: List[int], k: int) -> List[int]:
    # TODO: k 取模，切片拼接
    pass`,
        tests: [
            { args: [
                    [1, 2, 3, 4, 5, 6, 7], 3
                ], expect: [5, 6, 7, 1, 2, 3, 4] },
            { args: [
                    [-1, -100, 3, 99], 2
                ], expect: [3, 99, -1, -100] },
            { args: [
                    [1], 10
                ], expect: [1] }
        ]
    },

    // 7) Flood Fill（影像填色）
    {
        id: 'flood-fill',
        title: '0733. Flood Fill（影像填色）',
        description: '從 (sr, sc) 起將相同顏色的連通區塊替換為 color，回傳新影像。',
        fnName: 'flood_fill',
        starter: `from typing import List
from collections import deque

def flood_fill(image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
    # TODO: BFS/DFS 連通塗色
    pass`,
        tests: [{
                args: [
                    [
                        [1, 1, 1],
                        [1, 1, 0],
                        [1, 0, 1]
                    ], 1, 1, 2
                ],
                expect: [
                    [2, 2, 2],
                    [2, 2, 0],
                    [2, 0, 1]
                ]
            },
            {
                args: [
                    [
                        [0, 0, 0],
                        [0, 0, 0]
                    ], 0, 0, 0
                ],
                expect: [
                    [0, 0, 0],
                    [0, 0, 0]
                ]
            }
        ]
    },

    // 8) 島嶼數量（DFS/BFS）
    {
        id: 'num-islands',
        title: '0200. 島嶼數量 (Number of Islands)',
        description: '給定 0/1 字元矩陣，回傳島嶼的數量（1 代表陸地，四向連通）。',
        fnName: 'num_islands',
        starter: `from typing import List

def num_islands(grid: List[str]) -> int:
    # grid 以字串列表示，如 "11000"
    # TODO: DFS/BFS 標記拜訪
    pass`,
        tests: [
            { args: [
                    ["11110", "11010", "11000", "00000"]
                ], expect: 1 },
            { args: [
                    ["11000", "11000", "00100", "00011"]
                ], expect: 3 },
            { args: [
                    ["0"]
                ], expect: 0 }
        ]
    },

    // 9) 最短路徑（Dijkstra，單源最短距離）
    {
        id: 'dijkstra-shortest-path',
        title: '0743. 最短路徑 (Network Delay / Dijkstra 簡化版)',
        description: '給定節點數 n、加權有向邊 edges = [[u,v,w],...]、起點 src 及終點 dst，回傳 src 到 dst 的最短距離；若不可達回傳 -1。',
        fnName: 'shortest_path',
        starter: `from typing import List, Tuple
import heapq

def shortest_path(n: int, edges: List[List[int]], src: int, dst: int) -> int:
    # TODO: Dijkstra（鄰接表 + 小根堆）
    pass`,
        tests: [
            { args: [4, [
                    [0, 1, 1],
                    [1, 2, 2],
                    [0, 2, 4],
                    [2, 3, 1]
                ], 0, 3], expect: 4 }, // 0->1->2->3
            { args: [3, [
                    [0, 1, 5],
                    [1, 2, 5]
                ], 0, 2], expect: 10 },
            { args: [3, [
                    [0, 1, 2]
                ], 1, 2], expect: -1 }
        ]
    },

    // 10) Hard：正則樣式比對（. 與 *）
    {
        id: 'regex-matching',
        title: '0010. 正則樣式比對 (Regular Expression Matching) — HARD',
        description: '實作 is_match(s, p)：支援 "."（任意一字元）與 "*"（前一元素重複 0 次或多次）。需完全比對整個字串。',
        fnName: 'is_match',
        starter: `def is_match(s: str, p: str) -> bool:
    """
    實作經典 DP：regex matching（只支援 . 與 *）
    提示：
      - dp[i][j] 代表 s[:i] 與 p[:j] 是否匹配
      - 若 p[j-1] == '*': 需處理重複零次 / 一次以上兩種情況
    """
    # TODO: DP 解法
    pass`,
        tests: [
            { args: ["aa", "a"], expect: false },
            { args: ["aa", "a*"], expect: true },
            { args: ["ab", ".*"], expect: true },
            { args: ["aab", "c*a*b"], expect: true },
            { args: ["mississippi", "mis*is*p*."], expect: false },
            { args: ["mississippi", "mis*is*ip*."], expect: true }
        ]
    }
];