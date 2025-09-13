#!/bin/bash
# git-auto-push.sh
# 自动完成 git add、commit、push

# 默认 commit 信息
DEFAULT_MESSAGE="Auto update $(date '+%Y-%m-%d %H:%M:%S')"

# 检查是否在 git 仓库
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: 当前目录不是 git 仓库！"
    exit 1
fi

# 添加所有更改
git add .

# 提示用户输入 commit 信息，按 Enter 使用默认
read -p "请输入 commit 信息（默认: '$DEFAULT_MESSAGE'): " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-$DEFAULT_MESSAGE}

# 提交
git commit -m "$COMMIT_MSG"

# 推送到默认远程和分支
git push

# 完成提示
echo "✅ 提交并推送完成！"