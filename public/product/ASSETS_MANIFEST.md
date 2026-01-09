# 智谈AI 官网素材清单

## 需要替换的素材文件

以下是首页中使用的占位素材，请按照建议尺寸准备并替换：

### 视频素材

| 文件名 | 用途 | 建议规格 |
|--------|------|----------|
| `demo.mp4` | 产品功能演示视频 | 1920x1080, 15-30秒, H.264编码, <10MB |
| `demo-poster.png` | 演示视频封面图 | 1920x1080, PNG |
| `translate.mp4` | 多语言翻译演示视频 | 1920x1080, 15-30秒 |

### 图片素材

| 文件名 | 用途 | 建议规格 |
|--------|------|----------|
| `resume.png` | 简历定制功能截图 | 1200x800, PNG |
| `screen-your-view.png` | 用户视角截图（显示AI提示） | 1200x800, PNG |
| `screen-shared-view.png` | 共享屏幕视角（仅显示目标窗口） | 1200x800, PNG |

### Logo 素材（可选）

如需替换会议软件 Logo，请准备以下 SVG 文件放入 `/public/logos/` 目录：

- `tencent-meeting.svg` - 腾讯会议
- `feishu.svg` - 飞书会议
- `dingtalk.svg` - 钉钉
- `wecom.svg` - 企业微信
- `nowcoder.svg` - 牛客
- `zoom.svg` - Zoom
- `google-meet.svg` - Google Meet
- `teams.svg` - Microsoft Teams
- `chime.svg` - Amazon Chime
- `webex.svg` - Cisco Webex

Logo 建议规格：24x24px, 单色或品牌色

---

## 素材制作建议

### 视频素材
1. 使用 macOS 或 Windows 屏幕录制
2. 建议添加鼠标点击效果
3. 可使用 Keynote/PowerPoint 制作 mockup 动画
4. 压缩：使用 HandBrake 或 ffmpeg 压缩至 10MB 以内

### 截图素材
1. 使用高分辨率屏幕截图 (Retina 2x)
2. 可添加轻微阴影和圆角
3. 建议使用 Figma/Sketch 制作 mockup 效果

---

## 替换方法

1. 将素材文件放入 `/public/product/` 目录
2. 确保文件名与上表一致
3. 刷新页面即可看到效果

如需修改素材路径，请编辑 `/app/page.tsx` 中对应 section 的 `src` 属性。

