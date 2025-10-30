const PROBLEMS = [{
        id: 'two-sum',
        title: '0001. 兩數之和 (Two Sum)',
        description: '給定整數陣列 nums 與整數 target，回傳兩個索引使其相加等於 target。',
        fnName: 'two_sum',
        starter: `from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    # TODO: 使用雜湊表達到 O(n)
    pass`,
        tests: [
            { args: [
                    [2, 7, 11, 15], 9
                ], expect: [0, 1] },
            { args: [
                    [3, 2, 4], 6
                ], expect: [1, 2] }
        ]
    },
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
            { args: ["(]"], expect: false }
        ]
    },
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
                ], expect: 1 }
        ]
    },
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
            { args: [3], expect: 3 }
        ]
    },
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
            { args: ["race a car"], expect: false }
        ]
    },
    {
        id: 'rotate-array',
        title: '0189. 旋轉陣列 (Rotate Array)',
        description: '將陣列向右旋轉 k 步。',
        fnName: 'rotate_array',
        starter: `from typing import List

def rotate_array(nums: List[int], k: int) -> List[int]:
    # TODO: k 取模 + 切片拼接
    pass`,
        tests: [
            { args: [
                    [1, 2, 3, 4, 5, 6, 7], 3
                ], expect: [5, 6, 7, 1, 2, 3, 4] }
        ]
    },
    {
        id: 'flood-fill',
        title: '0733. Flood Fill（影像填色）',
        description: '從 (sr, sc) 起將相同顏色的連通區塊替換為 color。',
        fnName: 'flood_fill',
        starter: `from typing import List

def flood_fill(image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
    # TODO: BFS / DFS 塗色
    pass`,
        tests: [
            { args: [
                    [
                        [1, 1, 1],
                        [1, 1, 0],
                        [1, 0, 1]
                    ], 1, 1, 2
                ], expect: [
                    [2, 2, 2],
                    [2, 2, 0],
                    [2, 0, 1]
                ] }
        ]
    },
    {
        id: 'num-islands',
        title: '0200. 島嶼數量 (Number of Islands)',
        description: '給定 0/1 字元矩陣，回傳島嶼的數量。',
        fnName: 'num_islands',
        starter: `from typing import List

def num_islands(grid: List[str]) -> int:
    # TODO: DFS / BFS
    pass`,
        tests: [
            { args: [
                    ["11000", "11000", "00100", "00011"]
                ], expect: 3 }
        ]
    },
    {
        id: 'shortest-path',
        title: '0743. 最短路徑 (Dijkstra)',
        description: '單源最短距離。',
        fnName: 'shortest_path',
        starter: `from typing import List
import heapq

def shortest_path(n: int, edges: List[List[int]], src: int, dst: int) -> int:
    # TODO: Dijkstra
    pass`,
        tests: [
            { args: [4, [
                    [0, 1, 1],
                    [1, 2, 2],
                    [0, 2, 4],
                    [2, 3, 1]
                ], 0, 3], expect: 4 }
        ]
    },
    {
        id: 'regex-matching',
        title: '0010. 正則樣式比對 (Regular Expression Matching) — HARD',
        description: '支援 "." 與 "*" 的正則 DP，比對完整字串。',
        fnName: 'is_match',
        starter: `def is_match(s: str, p: str) -> bool:
    # TODO: DP 解法
    pass`,
        tests: [
            { args: ["aa", "a*"], expect: true },
            { args: ["mississippi", "mis*is*ip*."], expect: true }
        ]
    }
];