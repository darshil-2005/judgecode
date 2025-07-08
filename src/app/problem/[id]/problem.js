let problem1 = {

    "id": "some-id-value",
    "title": "Two Sum",
    "difficulty": "Easy",
    "description": "Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.\n\nYou may assume that each input would have ***exactly one solution***, and you may not use the *same* element twice.\n\nYou can return the answer in any order. **Only one valid answer exists.**\n\n## Follow-up\n\nCan you come up with an algorithm that is less than O(n²) time complexity?",
    "defaultCode": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    "testcases": [
      { "input": "[2,7,11,15], 9", "expectedOutput": "[0,1]" },
      { "input": "[3,2,4], 6", "expectedOutput": "[1,2]" },
      { "input": "[3,3], 6", "expectedOutput": "[0,1]" },
      { "input": "[1,2,3], 4", "expectedOutput": "[0,2]" }
    ],
    "param_types": "number[], number",
    "return_types": "number[]"
  }

export default problem1;
