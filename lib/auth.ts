import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_BASE_URL = process.env.API_URL || 'http://localhost:8000';

// Extended user type with backend tokens
declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    tier?: string;
  }
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      tier?: string;
    }
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    tier?: string;
    id?: string;
    provider?: string;
  }
}

// 微信登录 Provider 配置
const WeChatProvider = {
  id: "wechat",
  name: "微信",
  type: "oauth" as const,
  authorization: {
    url: "https://open.weixin.qq.com/connect/qrconnect",
    params: {
      appid: process.env.WECHAT_APP_ID,
      redirect_uri: process.env.WECHAT_REDIRECT_URI,
      response_type: "code",
      scope: "snsapi_login",
      state: Math.random().toString(36).substring(7),
    },
  },
  token: {
    url: "https://api.weixin.qq.com/sns/oauth2/access_token",
    async request({ params, provider }: { params: { code: string }, provider: { clientId?: string, clientSecret?: string } }) {
      // Call our backend instead of WeChat directly
      const response = await fetch(`${API_BASE_URL}/auth/wechat/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: params.code }),
      });
      
      if (!response.ok) {
        throw new Error('WeChat authentication failed');
      }
      
      const data = await response.json();
      return { 
        tokens: { 
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        } 
      };
    },
  },
  userinfo: {
    url: `${API_BASE_URL}/me`,
    async request({ tokens }: { tokens: { access_token: string } }) {
      const response = await fetch(`${API_BASE_URL}/me`, {
        headers: { 'Authorization': `Bearer ${tokens.access_token}` },
      });
      
      if (!response.ok) {
        throw new Error('Failed to get user info');
      }
      
      return await response.json();
    },
  },
  profile(profile: { id: string; nickname: string; avatar_url: string; tier: string }) {
    return {
      id: profile.id,
      name: profile.nickname,
      image: profile.avatar_url,
      tier: profile.tier,
    };
  },
  clientId: process.env.WECHAT_APP_ID,
  clientSecret: process.env.WECHAT_APP_SECRET,
};

export const authConfig: NextAuthConfig = {
  providers: [
    // 微信登录
    WeChatProvider,
    
    // 用户名密码登录 - 通过后端API验证
    Credentials({
      name: "用户名登录",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Call backend login API
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const error = await response.json().catch(() => ({ detail: 'Login failed' }));
            throw new Error(error.detail || 'Invalid username or password');
          }

          const tokens = await response.json();

          // Get user info with the new access token
          const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${tokens.access_token}` },
          });

          if (!userResponse.ok) {
            throw new Error('Failed to get user info');
          }

          const userInfo = await userResponse.json();

          return {
            id: userInfo.id,
            name: userInfo.nickname || userInfo.username,
            email: userInfo.email,
            image: userInfo.avatar_url,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            tier: userInfo.tier,
          };
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  
  pages: {
    signIn: "/user",
    error: "/user",
  },
  
  callbacks: {
    async jwt({ token, user, account }) {
      // 首次登录时，将用户信息和后端token添加到JWT
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tier = user.tier;
      }
      
      // 如果是微信登录，保存 provider 信息
      if (account?.provider === "wechat") {
        token.provider = "wechat";
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      
      // 如果是用户名密码登录，token已经在authorize函数中设置
      if (account?.provider === "credentials" && user) {
        token.provider = "credentials";
        // accessToken and refreshToken are already set from user object above
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // 将 token 中的信息添加到 session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.tier = token.tier as string;
      }
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  
  // 会话配置
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },
  
  // 安全配置
  trustHost: true,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
