import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24">
      <Section className="pt-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/20 flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#6366F1]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#EDEFF7]">隐私政策</h1>
              <p className="text-[#AAB0C0]">最后更新：2026年1月</p>
            </div>
          </div>

          <GlassCard>
            <article className="prose prose-invert max-w-none text-[#AAB0C0] leading-relaxed space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">1. 信息收集</h2>
                <p>
                  智语面试（以下简称"我们"）尊重并保护用户隐私。我们收集的信息仅限于提供服务所必需的范围，
                  包括但不限于：注册信息（邮箱地址）、设备信息、使用统计等。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">2. 信息使用</h2>
                <p>我们使用收集的信息用于：</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>提供、维护和改进我们的服务</li>
                  <li>发送服务相关的通知</li>
                  <li>防止欺诈和滥用</li>
                  <li>遵守法律义务</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">3. 数据安全</h2>
                <p>
                  我们采用行业标准的安全措施保护您的数据，包括加密传输、访问控制、
                  定期安全审计等。您的简历等敏感信息仅在本地处理，不会上传至我们的服务器。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">4. 用户权利</h2>
                <p>您有权：</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>访问您的个人数据</li>
                  <li>更正不准确的数据</li>
                  <li>删除您的账号和数据</li>
                  <li>导出您的数据</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">5. 联系我们</h2>
                <p>
                  如有任何隐私相关问题，请联系我们：
                  <a href="mailto:privacy@aizhiyu.com" className="text-[#6366F1] hover:underline ml-1">
                    privacy@aizhiyu.com
                  </a>
                </p>
              </section>
            </article>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}

