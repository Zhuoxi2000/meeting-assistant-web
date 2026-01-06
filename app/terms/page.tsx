import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24">
      <Section className="pt-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/20 flex items-center justify-center">
              <FileText className="w-7 h-7 text-[#6366F1]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#EDEFF7]">用户协议</h1>
              <p className="text-[#AAB0C0]">最后更新：2026年1月</p>
            </div>
          </div>

          <GlassCard>
            <article className="prose prose-invert max-w-none text-[#AAB0C0] leading-relaxed space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">1. 服务条款</h2>
                <p>
                  欢迎使用智语面试。通过访问或使用我们的服务，您同意受本用户协议的约束。
                  如果您不同意这些条款，请勿使用我们的服务。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">2. 账号注册</h2>
                <p>使用我们的服务需要注册账号。您需要：</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>提供真实、准确的注册信息</li>
                  <li>妥善保管您的账号密码</li>
                  <li>对账号下的所有活动负责</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">3. 服务使用规范</h2>
                <p>使用我们的服务时，您不得：</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>违反任何适用的法律法规</li>
                  <li>侵犯他人的知识产权或其他合法权益</li>
                  <li>传播恶意软件或进行网络攻击</li>
                  <li>滥用服务资源或干扰服务正常运行</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">4. 付费服务</h2>
                <p>
                  部分服务需要付费使用。付费后，您可以按照所购套餐的权限使用相应功能。
                  退款政策请参阅我们的定价页面说明。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">5. 免责声明</h2>
                <p>
                  智语面试仅提供面试辅助工具，不保证使用后一定能通过面试。
                  用户应对自己的面试表现负责，我们不承担因使用本服务产生的任何直接或间接损失。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">6. 协议修改</h2>
                <p>
                  我们保留随时修改本协议的权利。修改后的协议一经发布即生效。
                  继续使用服务即表示您接受修改后的协议。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#EDEFF7] mb-4">7. 联系方式</h2>
                <p>
                  如有任何问题，请联系我们：
                  <a href="mailto:support@aizhiyu.com" className="text-[#6366F1] hover:underline ml-1">
                    support@aizhiyu.com
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

