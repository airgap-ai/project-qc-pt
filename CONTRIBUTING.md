# 项目开发规范

## Git 提交规范

### 每次修改必须执行

1. **修改完成后立即提交**
   ```bash
   git add .
   git commit -m "提交信息"
   git push origin main
   ```

2. **提交信息格式**
   - 修复: `Fix xxx: 描述`
   - 新增: `Add xxx: 描述`
   - 更新: `Update xxx: 描述`
   - 删除: `Remove xxx: 描述`

3. **必须提供预览地址**

   每次修改完成后，在文末提供 GitHub Pages 预览地址：
   ```
   **预览地址**: https://airgap-ai.github.io/project-qc-pt/
   ```

---

## 开发工作流

```
修改代码 → 本地测试 → Git 提交 → Git 推送 → 提供预览地址
```

---

## 项目信息

- **仓库地址**: https://github.com/airgap-ai/project-qc-pt
- **GitHub Pages**: https://airgap-ai.github.io/project-qc-pt/
- **本地路径**: `/home/node/clawd/projects/web/project-qc-pt`

---

*最后更新: 2026-01-30*
